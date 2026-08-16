<script lang="ts">
  import {isMobile} from "src/util/html"
  import {themeColors, appName} from "src/partials/state"
  import Link from "src/partials/Link.svelte"
  import Button from "src/partials/Button.svelte"

  export let setStage
  export let nstartCompleted

  const params = new URLSearchParams({
    an: appName,
    ac: window.location.origin,
    at: isMobile ? "android" : "web",
    aa: $themeColors.accent.slice(1),
    asf: "yes",
  })

  const nstart = `https://start.njump.me/?${params.toString()}`

  const prev = () => setStage("intro")

  const next = () => setStage("follows")
</script>

<div class="flex gap-3">
  <p
    class="-ml-1 -mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-lg">
    2/4
  </p>
  <p class="text-2xl font-bold">Buat identitasmu (atau anonim)</p>
</div>
<p>
  Kita minta bantuan situs <strong>nstart</strong> buat bikin identitasmu. Jangan curiga — ini
  penjelasan singkatnya biar lu tau gak ada yang ngeribetin:
</p>
<div class="flex flex-col gap-3">
  <div class="flex items-start gap-3 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-4">
    <span class="mt-0.5 text-lg">🌐</span>
    <div class="flex flex-col gap-1">
      <strong class="text-[#eedfde]">Apa itu nstart?</strong>
      <p class="text-sm text-[#e7bcbb]">
        <strong>nstart</strong> (start.njump.me) adalah situs pihak ketiga yang kami pakai sebagai
        alat bantu. Kami gak punya hubungan apa-apa dengan dana/lisensi mereka — murni cuma buat
        bantu lu bikin akun Nostr dengan aman.
      </p>
    </div>
  </div>
  <div class="flex items-start gap-3 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-4">
    <span class="mt-0.5 text-lg">↩️</span>
    <div class="flex flex-col gap-1">
      <strong class="text-[#eedfde]">Kenapa harus redirect?</strong>
      <p class="text-sm text-[#e7bcbb]">
        Bikin kunci rahasia itu butuh beberapa langkah, dan nstart punya alur paling gampang. Jadi
        kita buka tab/situsnya sebentar, lu isi nama (atau bikin anonim), terus lu bakal dibawa
        <strong>balik ke sini</strong> otomatis buat lanjut.
      </p>
    </div>
  </div>
  <div class="flex items-start gap-3 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-4">
    <span class="mt-0.5 text-lg">🔐</span>
    <div class="flex flex-col gap-1">
      <strong class="text-[#eedfde]">Terus, keamanannya gimana?</strong>
      <p class="text-sm text-[#e7bcbb]">
        Kunci rahasia lu <strong>hanya dibuat di perangkat lu</strong> — nstart gak nyimpen, kami
        juga gak nyimpen. Setelah jadi, bakal balik ke Yapping dan gak ada yang bisa buka akun lu
        tanpa izin lu.
      </p>
    </div>
  </div>
</div>
<p class="text-sm text-[#5d3f3f]">
  Intinya: klik Lanjut → situs nstart kebuka → isi nama → balik ke sini. Aman, cepat, selesai.
</p>
<div class="flex gap-2">
  <Button class="btn" on:click={prev}><i class="fa fa-arrow-left" /> Balik</Button>
  {#if nstartCompleted}
    <Button class="btn btn-accent flex-grow" on:click={next}>OK, lanjut</Button>
  {:else}
    <Link class="btn btn-accent flex-grow" href={nstart} external target="">OK, lanjut →
    </Link>
  {/if}
</div>
