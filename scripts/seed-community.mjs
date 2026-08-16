// Seed curhat fiktif realistik untuk komunitas Sandwich Generation
// Jalankan: SEED_RELAY=wss://relay.yapping.my.id node scripts/seed-community.mjs
// ponytail: sekali jalan, seed manual. Buang file + hapus kunci setelah dipakai.
import {finalizeEvent, generateSecretKey} from "nostr-tools/pure"

const RELAY = process.env.SEED_RELAY || "wss://relay.yapping.my.id"
const PUBKEY = "e42ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9"

const CONTENT_HASHTAG = "#sandwichgeneration"

const seeds = [
  {
    pubkey:
      "e42ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Tiap gajian, gue bagi tiga: ortu, anak, dan sisanya buat gue yang kepinginnya nggak ada. Kadang pengen nangis sesekali tapi di kamar mandi biar rapi.",
  },
  {
    pubkey:
      "a12ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Dulu gue pikir hidup sandwich itu cuma lewat. Ternyata nggak: ortu makin tua, anak makin butuh, dan gue di tengah-tengah sambil nyoba nggak patah.",
  },
  {
    pubkey:
      "b23ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Rasanya gue jadi ATM berjalan: semua orang minta, jarang yang nanya 'kamu gimana?'. Halo yang lain di posisi yang sama, gue ngerti. Sumpah ngerti.",
  },
  {
    pubkey:
      "c34ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Tips yang jarang dibahas: minta bantuan bukan tanda lemah. Gue mulai bilang 'maaf Kak, bulan ini lagi sempit', dan rasa bersalahnya pelan-pelan hilang.",
  },
  {
    pubkey:
      "d45ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Buat yang lagi ngerasa sendirian di generasi ini: kita lebih banyak dari yang lu kira. Titip cerita di sini aja, gak apa-apa, gak dihakimi.",
  },
]

console.log(`Seeding ${seeds.length} posts ke ${RELAY} (tag: ${CONTENT_HASHTAG})`)

let succeeded = 0
let failed = 0

for (const seed of seeds) {
  const seckey = generateSecretKey()
  const event = finalizeEvent(
    {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400 * 3),
      tags: [["t", "sandwich-generation"], ["t", "curhat"]],
      content: seed.content,
    },
    seckey,
  )

  try {
    const result = await publish(RELAY, event)
    if (result) {
      succeeded++
      console.log(`  ✓ ${event.id.slice(0, 8)} — ${seed.content.slice(0, 40)}...`)
    } else {
      failed++
      console.log(`  ✗ ${event.id.slice(0, 8)}`)
    }
  } catch (e) {
    failed++
    console.log(`  ✗ error: ${e.message}`)
  }
}

console.log(`\nSelesai: ${succeeded} sukses, ${failed} gagal`)

function publish(relay, event) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(relay)
    const timeout = setTimeout(() => {
      ws.close()
      reject(new Error("timeout"))
    }, 15000)

    ws.onopen = () => {
      ws.send(JSON.stringify(["EVENT", event]))
    }
    ws.onmessage = ev => {
      const [type, id, ok, msg] = JSON.parse(ev.data)
      if (type === "OK" && id === event.id) {
        clearTimeout(timeout)
        ws.close()
        resolve(ok)
      } else if (type === "OK" && !ok) {
        clearTimeout(timeout)
        ws.close()
        console.log(`    rejected: ${msg}`)
        resolve(false)
      }
    }
    ws.onerror = err => {
      clearTimeout(timeout)
      reject(err)
    }
  })
}