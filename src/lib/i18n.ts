/**
 * Indonesian Localization for Suara
 * 
 * ponytail: No i18n library. Just a flat map of strings.
 * Upgrade: Crowdin integration if needed.
 */

export type Locale = "id"

const id: Record<string, string> = {
  // App
  "app.name": "suara",
  "app.description": "Curhat anonim, anti-somasi. Platform percakapan bebas sensor berbasis Nostr.",
  "app.tagline": "Suaramu, tanpa takut.",

  // Navigation
  "nav.home": "Beranda",
  "nav.search": "Cari",
  "nav.notifications": "Notifikasi",
  "nav.profile": "Profil",
  "nav.communities": "Komunitas",
  "nav.feeds": "Feed",
  "nav.settings": "Pengaturan",
  "nav.login": "Masuk",
  "nav.logout": "Keluar",

  // Auth
  "auth.login.title": "Masuk ke Suara",
  "auth.login.subtitle": "Gunakan ekstensi browser Nostr (Alby, Nos2x)",
  "auth.login.connect": "Hubungkan dompet",
  "auth.login.generate": "Buat kunci baru",
  "auth.login.warning": "Jangan masuk dengan nsec di web ini. Gunakan ekstensi browser.",
  "auth.logout.confirm": "Yakin ingin keluar?",

  // Post
  "post.compose.title": "Tulis sesuatu...",
  "post.compose.placeholder": "Apa yang ingin kamu sampaikan?",
  "post.compose.submit": "Kirim",
  "post.compose.anonymous": "Kirim sebagai anonim",
  "post.compose.delay": "Tunda pengiriman",
  "post.compose.delay.hint": "Post akan dikirim setelah jeda waktu",
  "post.reply": "Balas",
  "post.repost": "Ulang kirim",
  "post.quote": "Kutip",
  "post.react": "Reaksi",
  "post.delete": "Hapus",
  "post.report": "Laporkan",

  // Feed
  "feed.following": "Mengikuti",
  "feed.trusted": "Terpercaya",
  "feed.indonesia": "Indonesia",
  "feed.latest": "Terbaru",
  "feed.strict": "Sangat Ketat",
  "feed.global": "Global",

  // Trust
  "trust.score": "Skor Kepercayaan",
  "trust.level.very_high": "Sangat Tepercaya",
  "trust.level.high": "Tepercaya",
  "trust.level.medium": "Netral",
  "trust.level.low": "Kurang Tepercaya",
  "trust.level.very_low": "Tidak Tepercaya",
  "trust.vouch": "Vouch",
  "trust.unvouch": "Cabut Vouch",
  "trust.slashed": "Kepercayaan dipotong",

  // Moderation
  "mod.report.title": "Laporkan postingan",
  "mod.report.reason.spam": "Spam",
  "mod.report.reason.buzzer": "Buzzer/koordinasi",
  "mod.report.reason.harassment": "Pelecehan",
  "mod.report.reason.doxxing": "Doxxing",
  "mod.report.reason.threat": "Ancaman",
  "mod.report.reason.impersonation": "Pemalsuan identitas",
  "mod.report.reason.disinfo": "Disinformasi terkoordinasi",
  "mod.report.submit": "Kirim laporan",
  "mod.report.success": "Laporan terkirim. Terima kasih telah menjaga keamanan.",
  "mod.defense.title": "Bela postingan",
  "mod.defense.submit": "Kirim pembelaan",

  // Suppression Reasons
  "suppress.new_account": "Akun ini masih baru, butuh kepercayaan lebih sebelum tersebar luas.",
  "suppress.low_trust": "Skor kepercayaan rendah, distribusi dibatasi.",
  "suppress.coordinated": "Pola koordinasi terdeteksi, distribusi dibatasi sementara.",
  "suppress.muted": "Disembunyikan berdasarkan pengaturan kamu.",
  "suppress.community": "Moderator komunitas membatasi distribusi.",

  // Communities
  "community.create": "Buat Komunitas",
  "community.join": "Gabung",
  "community.leave": "Keluar",
  "community.moderators": "Moderator",
  "community.rules": "Aturan Komunitas",
  "community.strictness": "Tingkat Ketat",

  // Anonymous Posting
  "anon.title": "Posting Anonim",
  "anon.subtitle": "Posting tanpa mengungkap identitas kamu",
  "anon.warning": "Pastikan tidak ada informasi pribadi di postingan.",
  "anon.tip.no_photo": "Jangan unggah foto yang bisa mengidentifikasi kamu.",
  "anon.tip.no_location": "Sebutkan lokasi umum, bukan detail spesifik.",
  "anon.tip.no_names": "Jangan sebut nama orang yang bisa mengidentifikasi kamu.",
  "anon.disposable_account": "Buat akun sekali pakai",
  "anon.disposable_hint": "Akun ini tidak terhubung ke identitas kamu yang sebenarnya.",

  // Toxic Company (Forum)
  "forum.toxic_company": "Toxic Company",
  "forum.toxic_company.description": "Curhat tentang pengalaman kerja yang tidak menyenangkan",
  "forum.roast_government": "Roast Pemerintah",
  "forum.roast_government.description": "Kritik terhadap kebijakan pemerintah",
  "forum.sandwich_generation": "Sandwich Generation",
  "forum.sandwich_generation.description": "Berbagi pengalaman generasi sandwich",
  "forum.tech_career": "Karir Tech",
  "forum.tech_career.description": "Diskusi tentang karir di industri teknologi",

  // Settings
  "settings.title": "Pengaturan",
  "settings.language": "Bahasa",
  "settings.theme": "Tema",
  "settings.relay": "Relay",
  "settings.trust": "Pengaturan Kepercayaan",
  "settings.anonymity": "Pengaturan Anonimitas",
  "settings.notifications": "Notifikasi",

  // Time
  "time.just_now": "baru saja",
  "time.minutes_ago": "{n} menit yang lalu",
  "time.hours_ago": "{n} jam yang lalu",
  "time.days_ago": "{n} hari yang lalu",
  "time.weeks_ago": "{n} minggu yang lalu",

  // Generic
  "generic.loading": "Memuat...",
  "generic.error": "Terjadi kesalahan",
  "generic.retry": "Coba lagi",
  "generic.cancel": "Batal",
  "generic.save": "Simpan",
  "generic.delete": "Hapus",
  "generic.confirm": "Konfirmasi",
  "generic.back": "Kembali",
  "generic.next": "Berikutnya",
  "generic.search": "Cari...",
  "generic.no_results": "Tidak ada hasil",
  "generic.follow": "Ikuti",
  "generic.unfollow": "Berhenti mengikuti",
  "generic.followers": "Pengikut",
  "generic.following": "Mengikuti",
}

export function t(key: string, params?: Record<string, string | number>): string {
  let value = id[key] || key

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, String(v))
    }
  }

  return value
}

export function getLocale(): Locale {
  return "id"
}
