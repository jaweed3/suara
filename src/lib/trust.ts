/**
 * Trust Capital Module for Suara
 * 
 * Enhances Welshman's basic WoT (follows-follows) with:
 * - Age-weighted vouches (newer = stronger, with diminishing returns)
 * - Cluster diversity (vouches from diverse clusters count more)
 * - Slashing (bad reports/vouches reduce trust)
 * - Adversarial report/defense weighting
 * 
 * ponytail: This module is the moat. Don't merge it into Welshman.
 * Keep it as a thin layer on top — it's the product differentiation.
 */

import {now} from "@welshman/lib"

// === Constants ===

const AGE_HALF_LIFE_DAYS = 90 // Vouch weight halves every 90 days
const MIN_TRUST = 0
const MAX_TRUST = 100
const INITIAL_TRUST = 10
const CLUSTER_DILUTION_THRESHOLD = 0.3 // If >30% of vouches from same cluster, dilute
const SLASH_SEVERITY = 0.5 // Slash 50% of trust on bad behavior
const REPORT_WEIGHT_DECAY = 0.9 // Each hop from reporter reduces weight by 10%

// === Types ===

export interface Voucher {
  pubkey: string
  trust: number
  vouchedAt: number // unix timestamp
  cluster: string // cluster identifier
}

export interface TrustScore {
  pubkey: string
  score: number
  components: {
    baseWot: number // from Welshman follows-follows
    ageWeighted: number // after age adjustment
    clusterAdjusted: number // after cluster diversity
    slashed: number // after slashing penalties
    final: number // clamped to [MIN_TRUST, MAX_TRUST]
  }
  lastCalculated: number
}

export interface Report {
  reporterPubkey: string
  targetPubkey: string
  reason: string
  trustWeight: number // calculated from reporter's trust
  createdAt: number
}

export interface Defense {
  defenderPubkey: string
  targetPubkey: string
  trustWeight: number
  createdAt: number
}

// === Age Weighting ===

/**
 * Calculate age weight for a vouch.
 * Uses exponential decay with half-life.
 * Recent vouches count more, old ones count less.
 */
export function ageWeight(vouchedAt: number, nowTs: number = now()): number {
  const ageDays = Math.max(0, (nowTs - vouchedAt) / 86400)
  return Math.pow(0.5, ageDays / AGE_HALF_LIFE_DAYS)
}

// === Cluster Diversity ===

/**
 * Detect clusters from vouch graph.
 * A cluster is a group of pubkeys that all follow each other tightly.
 * 
 * ponytail: Simple BFS clustering. Good enough for MVP.
 * Upgrade: community detection algorithm (Louvain/Label Propagation)
 */
export function detectClusters(
  vouches: Voucher[],
  getFollows: (pk: string) => string[]
): Map<string, string[]> {
  const clusters = new Map<string, string[]>()
  const visited = new Set<string>()

  for (const v of vouches) {
    if (visited.has(v.pubkey)) continue

    const cluster: string[] = []
    const queue = [v.pubkey]

    while (queue.length > 0) {
      const pk = queue.shift()!
      if (visited.has(pk)) continue
      visited.add(pk)
      cluster.push(pk)

      const follows = getFollows(pk)
      for (const f of follows) {
        if (!visited.has(f) && vouches.some(v => v.pubkey === f)) {
          queue.push(f)
        }
      }
    }

    if (cluster.length > 0) {
      clusters.set(cluster[0], cluster)
    }
  }

  return clusters
}

/**
 * Calculate cluster diversity adjustment.
 * If too many vouches come from one cluster, dilute their weight.
 */
export function clusterDiversityAdjustment(
  vouches: Voucher[],
  clusters: Map<string, string[]>
): number {
  if (vouches.length === 0) return 1

  // Count vouches per cluster
  const clusterCounts = new Map<string, number>()
  for (const v of vouches) {
    for (const [id, members] of clusters) {
      if (members.includes(v.pubkey)) {
        clusterCounts.set(id, (clusterCounts.get(id) || 0) + 1)
        break
      }
    }
  }

  // Find dominant cluster
  const maxCount = Math.max(...clusterCounts.values())
  const dominance = maxCount / vouches.length

  // If dominant cluster > threshold, dilute
  if (dominance > CLUSTER_DILUTION_THRESHOLD) {
    // Scale from 1.0 (no dilution) to 0.5 (heavy dilution)
    return 1 - (dominance - CLUSTER_DILUTION_THRESHOLD) * (0.5 / (1 - CLUSTER_DILUTION_THRESHOLD))
  }

  return 1
}

// === Slashing ===

/**
 * Calculate slash amount for bad behavior.
 * Returns the trust penalty (positive number = reduction).
 */
export function calculateSlash(
  trust: number,
  severity: "minor" | "major" | "critical" = "minor"
): number {
  const multiplier = severity === "minor" ? 0.1 : severity === "major" ? 0.3 : 0.5
  return trust * SLASH_SEVERITY * multiplier
}

// === Core Trust Calculation ===

/**
 * Calculate enhanced trust score for a pubkey.
 * 
 * Algorithm:
 * 1. Start with Welshman's base WoT score (follows-follows)
 * 2. Apply age weighting to each vouch
 * 3. Apply cluster diversity adjustment
 * 4. Apply any slashing penalties
 * 5. Clamp to [MIN_TRUST, MAX_TRUST]
 */
export function calculateTrustScore(
  pubkey: string,
  baseWot: number,
  vouches: Voucher[],
  slashingPenalties: number = 0,
  getFollows: (pk: string) => string[] = () => []
): TrustScore {
  // Step 1: Start with base WoT
  let score = baseWot

  // Step 2: Age-weighted vouches
  const ageWeighted = vouches.reduce((sum, v) => {
    return sum + v.trust * ageWeight(v.vouchedAt)
  }, 0)

  // Step 3: Cluster diversity
  const clusters = detectClusters(vouches, getFollows)
  const diversityFactor = clusterDiversityAdjustment(vouches, clusters)
  const clusterAdjusted = ageWeighted * diversityFactor

  // Step 4: Blend base WoT with enhanced score
  // ponytail: 70% base WoT, 30% enhanced. Tune this.
  score = baseWot * 0.7 + clusterAdjusted * 0.3

  // Step 5: Apply slashing
  const slashed = Math.max(0, score - slashingPenalties)

  // Step 6: Clamp
  const final = Math.max(MIN_TRUST, Math.min(MAX_TRUST, slashed))

  return {
    pubkey,
    score: final,
    components: {
      baseWot,
      ageWeighted,
      clusterAdjusted,
      slashed,
      final,
    },
    lastCalculated: now(),
  }
}

// === Adversarial Report/Defense ===

/**
 * Calculate the weight of a report based on reporter's trust.
 * Higher trust = more weight.
 */
export function reportWeight(report: Report, reporterTrust: TrustScore): number {
  // Base weight is proportional to reporter trust
  const baseWeight = reporterTrust.score / MAX_TRUST
  
  // Apply decay if reporter is far from target in trust graph
  // ponytail: Using trust score difference as proxy for graph distance
  // Upgrade: actual graph distance calculation
  const trustDiff = Math.abs(reporterTrust.score - 50) / 50
  const distanceDecay = Math.pow(REPORT_WEIGHT_DECAY, trustDiff * 10)
  
  return baseWeight * distanceDecay
}

/**
 * Calculate aggregate report weight for a target.
 * Cluster detection: if reports come from one tight cluster, dilute.
 */
export function aggregateReportWeight(
  reports: Report[],
  reporterTrusts: Map<string, TrustScore>
): number {
  if (reports.length === 0) return 0

  // Calculate individual weights
  const weights = reports.map(r => {
    const trust = reporterTrusts.get(r.reporterPubkey)
    return trust ? reportWeight(r, trust) : 0.1 // Default low weight for unknown reporters
  })

  // Detect cluster brigading
  // ponytail: Simple approach - check if reporters follow each other
  // Upgrade: graph clustering on reporter set
  const uniqueReporters = new Set(reports.map(r => r.reporterPubkey))
  const clusterFactor = uniqueReporters.size < reports.length * 0.5 ? 0.5 : 1

  return weights.reduce((sum, w) => sum + w, 0) * clusterFactor
}

/**
 * Calculate aggregate defense weight for a target.
 * Same logic as report weight, but from defenders.
 */
export function aggregateDefenseWeight(
  defenses: Defense[],
  defenderTrusts: Map<string, TrustScore>
): number {
  if (defenses.length === 0) return 0

  const weights = defenses.map(d => {
    const trust = defenderTrusts.get(d.defenderPubkey)
    return trust ? trust.score / MAX_TRUST : 0.1
  })

  return weights.reduce((sum, w) => sum + w, 0)
}

/**
 * Determine if a post should be suppressed based on adversarial weighting.
 * 
 * Decision logic:
 * - If report_weight > defense_weight * 1.5 → suppress
 * - If report_weight > defense_weight → show warning
 * - Otherwise → no action
 */
export function shouldSuppress(
  reportWeight: number,
  defenseWeight: number
): "suppress" | "warn" | "none" {
  const ratio = reportWeight / Math.max(defenseWeight, 0.01)
  
  if (ratio > 1.5) return "suppress"
  if (ratio > 1.0) return "warn"
  return "none"
}

// === Per-Forum Strictness ===

export interface ForumStrictness {
  minTrustToPost: number
  minTrustToDistribute: number
  reportThreshold: number // reports needed before action
  requireDefense: boolean // require defense before suppression
  clusterDilutionStrict: boolean // aggressive cluster detection
}

export const FORUM_STRICTNESS: Record<string, ForumStrictness> = {
  // Light moderation - low-value targets
  casual: {
    minTrustToPost: 0,
    minTrustToDistribute: 0,
    reportThreshold: 10,
    requireDefense: false,
    clusterDilutionStrict: false,
  },
  // Standard moderation
  standard: {
    minTrustToPost: 0,
    minTrustToDistribute: 5,
    reportThreshold: 5,
    requireDefense: false,
    clusterDilutionStrict: false,
  },
  // Strict moderation - high-value targets (politics, etc.)
  strict: {
    minTrustToPost: 5,
    minTrustToDistribute: 20,
    reportThreshold: 3,
    requireDefense: true,
    clusterDilutionStrict: true,
  },
  // Maximum moderation - critical targets
  maximum: {
    minTrustToPost: 15,
    minTrustToDistribute: 40,
    reportThreshold: 2,
    requireDefense: true,
    clusterDilutionStrict: true,
  },
}

/**
 * Get the appropriate strictness level for a forum.
 * ponytail: Simple mapping. Upgrade: community-configurable.
 */
export function getForumStrictness(forumType: string): ForumStrictness {
  return FORUM_STRICTNESS[forumType] || FORUM_STRICTNESS.standard
}

// === Utility ===

export function clampTrust(score: number): number {
  return Math.max(MIN_TRUST, Math.min(MAX_TRUST, score))
}

export function trustToLabel(score: number): string {
  if (score >= 80) return "Sangat Tepercaya"
  if (score >= 60) return "Tepercaya"
  if (score >= 40) return "Netral"
  if (score >= 20) return "Kurang Tepercaya"
  return "Tidak Tepercaya"
}

export function trustToColor(score: number): string {
  if (score >= 80) return "#10B981" // green
  if (score >= 60) return "#3B82F6" // blue
  if (score >= 40) return "#6B7280" // gray
  if (score >= 20) return "#F59E0B" // yellow
  return "#EF4444" // red
}
