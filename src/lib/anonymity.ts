/**
 * Anonymity UX for Suara
 * 
 * ponytail: This module provides guidance and utilities for anonymous posting.
 * It does NOT provide strong anonymity — that requires Tor/VPN on the user's side.
 * What we can do: zero-log relay, disposable accounts, timing obfuscation.
 */

import {generateSecretKey, getPublicKey} from "nostr-tools/pure"

// === Disposable Account ===

export interface DisposableAccount {
  pubkey: string
  seckey: string
  createdAt: number
 用途: "curhat" | "report" | "general"
}

/**
 * Generate a disposable account for anonymous posting.
 * 
 * Security notes:
 * - seckey is only kept in memory, never logged
 * - Account is not linked to any real identity
 * - User should use Tor/VPN when creating and using
 */
export function generateDisposableAccount(
  purpose: DisposableAccount["用途"] = "curhat"
): DisposableAccount {
  const seckey = generateSecretKey()
  const pubkey = getPublicKey(seckey)

  return {
    pubkey,
    seckey: seckey as string,
    createdAt: Math.floor(Date.now() / 1000),
    purpose,
  }
}

// === Timing Obfuscation ===

/**
 * Generate a random delay for posting.
 * Makes it harder to correlate post timing with real-world events.
 * 
 * ponytail: Uniform random between 1-30 minutes.
 * Upgrade: Poisson distribution to look more natural.
 */
export function randomPostDelay(): number {
  return Math.floor(Math.random() * 1800) + 60 // 60-1860 seconds
}

/**
 * Check if a post should be delayed based on account age.
 * New accounts get longer delays to avoid pattern detection.
 */
export function shouldDelayPost(accountAge: number): boolean {
  // Delay posts from accounts < 7 days old
  return accountAge < 7 * 24 * 60 * 60
}

// === Content Sanitization ===

/**
 * Check if content might contain identifying information.
 * Returns warnings, not blocks — user decides.
 */
export function checkIdentifyingContent(content: string): string[] {
  const warnings: string[] = []

  // Check for phone numbers (Indonesian format)
  if (content.match(/(\+62|62|08)\d{8,12}/)) {
    warnings.push("Nomor telepon terdeteksi. Pertimbangkan untuk menghapusnya.")
  }

  // Check for email addresses
  if (content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
    warnings.push("Alamat email terdeteksi. Pertimbangkan untuk menghapusnya.")
  }

  // Check for NIK (Indonesian national ID)
  if (content.match(/\b\d{16}\b/)) {
    warnings.push("Nomor identitas (16 digit) terdeteksi. Pertimbangkan untuk menghapusnya.")
  }

  // Check for specific company names (basic check)
  const companyPatterns = [
    /pt\s+\w+/i,
    /cv\s+\w+/i,
    /ud\s+\w+/i,
    /tbk/i,
    /persero/i,
  ]

  for (const pattern of companyPatterns) {
    if (content.match(pattern)) {
      warnings.push("Nama perusahaan terdeteksi. Pertimbangkan untuk mengganti dengan nama samaran.")
      break
    }
  }

  return warnings
}

// === Zero-Log Relay Config ===

export interface ZeroLogRelayConfig {
  url: string
  zeroLog: boolean
  reason: string
}

/**
 * Recommended relay configuration for anonymous posting.
 * 
 * ponytail: These are recommendations, not enforcement.
 * User should verify relay policies themselves.
 */
export const ANONYMOUS_RELAY_RECOMMENDATIONS: ZeroLogRelayConfig[] = [
  {
    url: "wss://relay.damus.io",
    zeroLog: false, // We don't know their policy
    reason: "Relay publik besar, kebijakan logging tidak diketahui",
  },
  {
    url: "wss://nos.lol",
    zeroLog: false,
    reason: "Relay publik, kebijakan logging tidak diketahui",
  },
  // User should run their own relay for maximum anonymity
  {
    url: "wss://relay.suara.app",
    zeroLog: true, // Our relay, zero-log by design
    reason: "Relay Suara, zero-log by design",
  },
]

// === Anonymity Score ===

export interface AnonymityScore {
  score: number // 0-100
  factors: {
    usesTor: boolean
    usesVPN: boolean
    disposableAccount: boolean
    noPersonalInfo: boolean
    timingObfuscated: boolean
    zeroLogRelay: boolean
  }
  recommendations: string[]
}

/**
 * Calculate anonymity score for a posting session.
 * 
 * ponytail: Simple checklist scoring. Upgrade: more sophisticated analysis.
 */
export function calculateAnonymityScore(factors: AnonymityScore["factors"]): AnonymityScore {
  let score = 0
  const recommendations: string[] = []

  if (factors.usesTor) score += 25
  else recommendations.push("Gunakan Tor untuk IP anonymization")

  if (factors.usesVPN) score += 20
  else recommendations.push("Gunakan VPN sebagai alternatif Tor")

  if (factors.disposableAccount) score += 20
  else recommendations.push("Buat akun sekali pakai untuk posting anonim")

  if (factors.noPersonalInfo) score += 15
  else recommendations.push("Hapus informasi pribadi dari konten")

  if (factors.timingObfuscated) score += 10
  else recommendations.push("Tunda posting untuk menghindari korelasi waktu")

  if (factors.zeroLogRelay) score += 10
  else recommendations.push("Gunakan relay zero-log seperti relay.suara.app")

  return {
    score: Math.min(100, score),
    factors,
    recommendations,
  }
}

// === Secure Cleanup ===

/**
 * Clear sensitive data from memory.
 * 
 * ponytail: JavaScript doesn't guarantee memory cleanup.
 * This is best-effort. True anonymity requires Tor + disposable devices.
 */
export function secureCleanup(account: DisposableAccount): void {
  // Overwrite seckey with zeros
  const zeros = "0".repeat(64)
  ;(account as any).seckey = zeros

  // Clear the object
  Object.keys(account).forEach(key => {
    delete (account as any)[key]
  })
}
