# Yapping

**Tempat curhat anonim, anti-buzzer, anti-somasi.** Dibangun di atas [Nostr](https://nostr.com/) — protokol sosial terbuka tanpa server pusat.

> **yapping.my.id** — cerita kerjaan, beban keluarga, pengalaman toxic, dan opini yang selama ini ditahan. Di sini suaramu aman, gak ada yang bisa shadowban diam-diam.

## Kenapa Yapping?

Kebanyakan platform sosial mengunci suaramu: satu server pusat yang bisa dinonaktifkan, algoritma yang bisa menyembunyikan konten tanpa alasan, dan moderasi yang bisa disalahgunakan buzzer.

Yapping dipakai untuk hal-hal yang paling berisiko diceritakan di platform lain:

- **Curhat kerjaan** — karyawan yang mau cerita soal toxic company tanpa takut disomasi.
- **Sandwich generation** — beban nanggung ortu + anak + diri sendiri, biar gak dipendem sendiri.
- **Toxic relationship** — manipulasi, ghosting, dan cara keluar dari relasi yang bikin mental drop.
- **Roast pemerintah** — kritik kebijakan, tanpa khawatir UU ITE dipakai buat bungkam.

### Jaminan struktural (bukan sekadar janji)

| | |
|---|---|
| 🛡️ **Anonim kapan aja** | Bisa curhat tanpa nama — relay gak menyimpan jejak yang bisa diserahkan. |
| 🔒 **Kuncimu cuma di kamu** | Identitas = kunci kriptografi di tanganmu, bukan akun di server perusahaan. |
| 💬 **Didengerin, bukan dihakimi** | Feed `#curhat` dan komunitas per-topik — bukan ruang debat yang seram. |
| 📄 **Gak ada shadowban rahasia** | Aturan transparan; user bebas pindah feed, relay, atau client. |

## Cara kerjanya

```
Kamu menulis → event ditandatangani kunci kamu → dikirim ke banyak relay
                                                              ↓
              Relay lain di jaringan Nostr juga bisa membacanya (universal)
```

- **Mengikuti / Terbaru / Terpercaya** — tiga lensa feed; Terpercaya di-tuning Web of Trust biar spam & buzzer otomatis diredupkan, tanpa ngerusuhin konten asli.
- **Multi-relay** — posting nyebar ke beberapa relay, jadi gak ada satu server yang bisa mematikan kontenmu.

## Fitur

✅ Yapping (post berikut threads) & reply
✅ Love (reaksi), repost, dan zap (tip Lightning)
✅ Feed per komunitas: **Budak Korporat · Toxic Company · Sandwich Generation · Toxic Relationship · Roast Pemerintah · Karir Tech**
✅ Discover: jelajah komunitas + curhatan terbaru
✅ Onboarding 4 langkah ramah non-teknis (gak butuh paham Nostr)
✅ Web of Trust — anti-spam & anti-koordinasi buzzer
✅ NIP-05 (handle `nama@domain`), NIP-07 (login ekstensi)
✅ Relays bisa dikonfigurasi per-user
✅ Installable sebagai PWA

## Tech stack

- **Client:** Svelte (fork dari [Coracle](https://github.com/coracle-social/coracle), lisensi MIT)
- **Protokol:** Nostr (`@welshman/*`, `nostr-tools`)
- **Relay:** `nostr-rs-relay` (<a href="https://relay.yapping.my.id">relay.yapping.my.id</a>)
- **Stacks:** Vite · Tailwind CSS · pnpm
- **CI/CD:** GitHub Actions → Docker (GHCR) → self-hosted runner di VPS

## Menjalankan lokal

```bash
git clone https://github.com/jaweed3/suara.git
cd suara
pnpm install
cp .env.template .env      # sesuaikan relay & branding
pnpm run dev               # http://localhost:5173
```

Build produksi:

```bash
pnpm run check:ts          # typecheck
pnpm run build
```

## Konfigurasi

Sesuaikan di `.env` (lihat [.env.template](./.env.template)):

| Variable | Fungsi |
|---|---|
| `VITE_APP_NAME` / `VITE_APP_URL` | Nama & URL produk |
| `VITE_DEFAULT_RELAYS` | Relay default untuk baca/tulis |
| `VITE_APP_DESCRIPTION` | Deskripsi untuk SEO/OG tags |
| `VITE_DARK_THEME` / `VITE_LIGHT_THEME` | Palet warna (koma-pisah `key:value`) |

## Deploy

Auto-deploy ke VPS tiap push ke `master`:

```
push → GitHub Actions (typecheck → build image → push GHCR) → self-hosted runner → docker compose up
```

## Lisensi

MIT — bebas fork, pakai, dan modifikasi.