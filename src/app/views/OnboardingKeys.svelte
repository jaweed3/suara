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
  Kita kasih cara buat identitas — isi nama asli, nama samaran, atau langsung gas pol tanpa nama.
  Mau yang mana terserah lu.
</p>
<p>
  Yang jelas, kuncimu cuma satu-satunya yang pegang di tangan lu. Gak ada server, gak ada
  perusahaan, gak ada siapa-siapa yang bisa buka identitas lu tanpa izin lu.
</p>
<div class="flex gap-2">
  <Button class="btn" on:click={prev}><i class="fa fa-arrow-left" /> Balik</Button>
  {#if nstartCompleted}
    <Button class="btn btn-accent flex-grow" on:click={next}>Lanjut</Button>
  {:else}
    <Link class="btn btn-accent flex-grow" href={nstart} external target="">Lanjut</Link>
  {/if}
</div>
