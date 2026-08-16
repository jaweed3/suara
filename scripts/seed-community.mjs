// Seed curhat fiktif realistik untuk komunitas Sandwich Generation
// Jalankan: SEED_RELAY=wss://relay.yapping.my.id node scripts/seed-community.mjs
// ponytail: sekali jalan, seed manual. Buang file + hapus kunci setelah dipakai.
import {finalizeEvent, generateSecretKey} from "nostr-tools/pure"

const RELAY = process.env.SEED_RELAY || "wss://relay.yapping.my.id"
const PUBKEY = "e42ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9"

const CONTENT_HASHTAG = "#sandwichgeneration"

const seeds = [
  // Sandwich Generation
  {
    pubkey:
      "e42ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Tiap gajian, gue bagi tiga: ortu, anak, dan sisanya buat gue yang kepinginnya nggak ada. Kadang pengen nangis sesekali tapi di kamar mandi biar rapi.",
    tag: "sandwich-generation",
  },
  {
    pubkey:
      "a12ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Dulu gue pikir hidup sandwich itu cuma lewat. Ternyata nggak: ortu makin tua, anak makin butuh, dan gue di tengah-tengah sambil nyoba nggak patah.",
    tag: "sandwich-generation",
  },
  // Budak Korporat
  {
    pubkey:
      "b23ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Sore di-zoom gak dihitung lembur, tapi pulang tepat waktu dihitung gak loyal. Budak korporat itu kenyataan, bukan candaan.",
    tag: "budak-korporat",
  },
  {
    pubkey:
      "c34ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Atasan bilang 'kita keluarga', padahal pas gue sakit malah ditanya 'kerjanya kapan selesai?'. Gaslighting tingkat dewa.",
    tag: "budak-korporat",
  },
  // Toxic Relationship
  {
    pubkey:
      "d45ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Cinta gak harus cemburu-cemburuan terus. Kalau tiap week lu harus buktiin 'gak ada yang lain', itu bukan sayang, itu kontrol.",
    tag: "toxic-relationship",
  },
  {
    pubkey:
      "f56ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Ghosting 3 hari, balik manis kayak nggak ada apa-apa, trus moodswing. Capek — dan itu bukan standar yang sehat.",
    tag: "toxic-relationship",
  },
  // Roast Pemerintah
  {
    pubkey:
      "9a6ef7b55f5c3e2e1a92a87ffc7d0d5e0c9b1a9d5f4e3f8d7c6b5a4f3e2d1c9",
    content:
      "Mau kritik kebijakan kok malah balik ke UU ITE. Sehat-sehat aja demokrasi kalau beda pendapat dianggap fitnah.",
    tag: "roast-pemerintah",
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
      tags: [["t", seed.tag], ["t", "curhat"]],
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