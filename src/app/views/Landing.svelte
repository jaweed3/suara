<script lang="ts">
  import {router} from "src/app/util/router"
  import Button from "src/partials/Button.svelte"
  import Link from "src/partials/Link.svelte"
  import MaterialIcon from "src/partials/MaterialIcon.svelte"

  const startOnboarding = () => router.at("signup").push()

  const login = () => router.at("login").open()
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-16">
  <div class="flex flex-col items-center gap-6 text-center">
    <div class="flex items-center gap-3">
      <span class="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white"
        >Y</span
      >
      <span class="font-headline text-6xl font-extrabold tracking-tight text-[#eedfde]">yapping</span>
    </div>
    <p class="max-w-xl text-xl leading-relaxed text-[#e7bcbb]">
      Lu gak sendirian. Kerjaan numpuk, ortu butuh biaya, anak ditagih-tagih — di sini kamu bisa
      cerita, keluar dari kepala, tanpa takut dihakimi.
    </p>
  </div>

  <div class="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
    <div class="flex flex-col items-center gap-2 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-5 text-center">
      <MaterialIcon name="shield" className="text-3xl text-accent" />
      <strong class="font-headline text-[#eedfde]">Anonim kapan aja</strong>
      <p class="text-sm text-[#8e6e6e]">Bisa curhat tanpa nama — gak ada yang bisa nge-trace lu.</p>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-5 text-center">
      <MaterialIcon name="chat_bubble" className="text-3xl text-accent" />
      <strong class="font-headline text-[#eedfde]">Didengerin, bukan dihakimi</strong>
      <p class="text-sm text-[#8e6e6e]">Komunitas yang ngerasain hal yang sama — itu support asli.</p>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-5 text-center">
      <MaterialIcon name="lock" className="text-3xl text-accent" />
      <strong class="font-headline text-[#eedfde]">Kuncimu cuma di kamu</strong>
      <p class="text-sm text-[#8e6e6e]">Identitas di tangan lu, bukan di server perusahaan.</p>
    </div>
  </div>

  <div class="flex flex-col items-center gap-4">
    <Button class="yap-btn rounded-full px-10 py-4 text-lg font-bold" on:click={startOnboarding}
      >Mulai — gratis, gak perlu email</Button
    >
    <p class="text-sm text-[#8e6e6e]">
      Udah punya akun Nostr?{" "}
      <Button class="text-inherit underline" on:click={login}>Masuk</Button>
    </p>
  </div>

  <p class="max-w-md text-center text-xs leading-relaxed text-[#5d3f3f]">
    Yapping dibangun di atas Nostr: protokol terbuka tanpa server pusat. Gak ada satu pihak yang
    bisa matiin suaramu — atau shadowban diam-diam.
  </p>
  <Link class="text-xs text-[#8e6e6e] hover:underline" href="/about">Tentang Yapping</Link>
</div>