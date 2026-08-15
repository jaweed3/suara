/**
 * Community Structure for Suara
 * 
 * ponytail: Forum-based moderation with per-forum trust strictness.
 * Each community = one forum with its own rules, trust level, and moderation.
 * Data lives on Nostr relays via NIP-72.
 */

import {FORUM_STRICTNESS, type ForumStrictness} from "./trust"

// === Community Types ===

export type CommunityType =
  | "casual"
  | "toxic_company"
  | "roast_government"
  | "sandwich_generation"
  | "tech_career"
  | "general"

export interface Community {
  id: string
  name: string
  description: string
  type: CommunityType
  strictness: ForumStrictness
  relayHints: string[]
  moderators: string[]
  createdAt: number
}

// === Pre-defined Communities ===

export const DEFAULT_COMMUNITIES: Community[] = [
  {
    id: "toxic-company",
    name: "Toxic Company",
    description: "Curhat tentang pengalaman kerja yang tidak menyenangkan. Posting anonim didukung.",
    type: "toxic_company",
    strictness: FORUM_STRICTNESS.strict,
    relayHints: ["wss://relay.suara.app"],
    moderators: [],
    createdAt: 1700000000,
  },
  {
    id: "roast-pemerintah",
    name: "Roast Pemerintah",
    description: "Kritik terhadap kebijakan pemerintah. Forum ini dilindungi anti-SLAPP.",
    type: "roast_government",
    strictness: FORUM_STRICTNESS.maximum,
    relayHints: ["wss://relay.suara.app"],
    moderators: [],
    createdAt: 1700000000,
  },
  {
    id: "sandwich-generation",
    name: "Sandwich Generation",
    description: "Berbagi pengalaman generasi sandwich. Dukungan sesama.",
    type: "sandwich_generation",
    strictness: FORUM_STRICTNESS.casual,
    relayHints: ["wss://relay.suara.app"],
    moderators: [],
    createdAt: 1700000000,
  },
  {
    id: "tech-career",
    name: "Karir Tech",
    description: "Diskusi tentang karir di industri teknologi Indonesia.",
    type: "tech_career",
    strictness: FORUM_STRICTNESS.standard,
    relayHints: ["wss://relay.suara.app"],
    moderators: [],
    createdAt: 1700000000,
  },
  {
    id: "general",
    name: "Umum",
    description: "Diskusi umum tentang apa saja.",
    type: "general",
    strictness: FORUM_STRICTNESS.standard,
    relayHints: ["wss://relay.suara.app"],
    moderators: [],
    createdAt: 1700000000,
  },
]

// === Community Utils ===

/**
 * Get community by ID.
 */
export function getCommunity(id: string): Community | undefined {
  return DEFAULT_COMMUNITIES.find(c => c.id === id)
}

/**
 * Get communities by strictness level.
 */
export function getCommunitiesByStrictness(level: "casual" | "standard" | "strict" | "maximum"): Community[] {
  return DEFAULT_COMMUNITIES.filter(c => c.strictness === FORUM_STRICTNESS[level])
}

/**
 * Check if a user can post in a community based on trust score.
 */
export function canPostInCommunity(
  trustScore: number,
  community: Community
): {allowed: boolean; reason?: string} {
  if (trustScore < community.strictness.minTrustToPost) {
    return {
      allowed: false,
      reason: `Skor kepercayaan kamu (${Math.round(trustScore)}) belum mencapai minimum (${community.strictness.minTrustToPost}) untuk forum ini.`,
    }
  }

  return {allowed: true}
}

/**
 * Check if a post should be distributed in a community.
 */
export function shouldDistributeInCommunity(
  trustScore: number,
  community: Community
): {distributed: boolean; reason?: string} {
  if (trustScore < community.strictness.minTrustToDistribute) {
    return {
      distributed: false,
      reason: `Distribusi dibatasi: skor kepercayaan (${Math.round(trustScore)}) belum mencapai minimum (${community.strictness.minTrustToDistribute}).`,
    }
  }

  return {distributed: true}
}

// === Community Feed Filtering ===

export interface CommunityFeedFilter {
  communityId: string
  minTrust: number
  excludeMuted: boolean
  excludeLowTrust: boolean
}

/**
 * Generate feed filter for a community.
 */
export function getCommunityFeedFilter(community: Community): CommunityFeedFilter {
  return {
    communityId: community.id,
    minTrust: community.strictness.minTrustToDistribute,
    excludeMuted: true,
    excludeLowTrust: community.strictness.clusterDilutionStrict,
  }
}

// === NIP-72 Event Helpers ===

/**
 * Create a community definition event (kind 34550).
 * 
 * ponytail: Simplified NIP-72 event creation.
 * Upgrade: Full NIP-72 spec compliance.
 */
export function createCommunityEvent(community: Community): object {
  return {
    kind: 34550,
    content: community.description,
    tags: [
      ["d", community.id],
      ["name", community.name],
      ["description", community.description],
      ...community.relayHints.map(r => ["relay", r]),
      ...community.moderators.map(m => ["p", m, "", "moderator"]),
    ],
  }
}

/**
 * Create a community post event (kind 1 with 'a' tag).
 */
export function createCommunityPostEvent(
  content: string,
  communityId: string,
  communityPubkey: string
): object {
  return {
    kind: 1,
    content,
    tags: [
      ["a", `34550:${communityPubkey}:${communityId}`],
      ["L", communityId],
      ["l", communityId],
    ],
  }
}
