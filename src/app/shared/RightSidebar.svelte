<script lang="ts">
  import {router} from "src/app/util/router"

  const search = () => router.at("/search").open()

  const trends = [
    {cat: "POLITIK", tag: "#TolakUUITE", count: "12.5K"},
    {cat: "TEKNOLOGI", tag: "Nostr Relays Down?", count: "8,432"},
    {cat: "LOKAL", tag: "Jakarta Protests", count: "5,102"},
  ]
</script>

<aside
  class="bottom-sai right-sai top-sai fixed z-sidebar hidden w-[320px] flex-col gap-6 overflow-y-auto border-l border-solid border-[#2d0a0a] px-4 py-6 lg:flex">
  <div class="relative">
    <span
      class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8e6e6e]"
      >search</span
    >
    <button
      class="input-bg w-full rounded-full border border-solid border-[#2d0a0a] py-2 pl-10 pr-4 text-left text-sm text-[#8e6e6e] outline-none transition-colors focus:border-accent"
      on:click={search}>
      Cari di jaringan...
    </button>
  </div>

  <div class="rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-4">
    <h2 class="mb-4 font-headline text-lg font-bold text-[#eedfde]">Trending</h2>
    <div class="flex flex-col gap-4">
      {#each trends as t, i}
        <div class="group flex cursor-pointer flex-col">
          <span class="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e6e6e]"
            >{i + 1} • {t.cat}</span
          >
          <span class="text-sm font-semibold text-[#eedfde] group-hover:text-accent"
            >{t.tag}</span
          >
          <span class="mt-1 text-xs text-[#8e6e6e]">{t.count} Yaps</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-4">
    <h2 class="mb-4 flex items-center gap-2 font-headline text-lg font-bold text-[#eedfde]">
      Web of Trust
      <span class="material-symbols-outlined text-[18px] text-accent">policy</span>
    </h2>
    <p class="text-sm leading-relaxed text-[#e7bcbb]">
      Mau curhat apa? Kerjaan? Ekonomi? Toxic experience? Gaspol aja — di sini suaramu aman,
      dan orang-orang tepercaya di jaringanmu yang bakal dengerin.
    </p>
  </div>

  <footer class="mt-auto flex flex-wrap gap-x-3 gap-y-1 py-4">
    <a class="text-xs text-[#8e6e6e] hover:underline" href="/terms.html">Terms of Service</a>
    <a class="text-xs text-[#8e6e6e] hover:underline" href="/privacy.html">Privacy Policy</a>
    <a class="text-xs text-[#8e6e6e] hover:underline" href="/settings/relays">Relay Info</a>
    <span class="text-xs text-[#8e6e6e]">© 2024 Yapping Corp.</span>
  </footer>
</aside>