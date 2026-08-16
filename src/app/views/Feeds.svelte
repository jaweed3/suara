<script lang="ts">
  import {pubkey} from "@welshman/app"
  import Button from "src/partials/Button.svelte"
  import Feed from "src/app/shared/Feed.svelte"
  import MaterialIcon from "src/partials/MaterialIcon.svelte"
  import {router} from "src/app/util/router"
  import {defaultFeed} from "src/engine"

  export let feed = null

  const showLogin = () => router.at("login").open()

  const createNote = () => router.at("notes/create").open()

  const initialFeed = feed || $defaultFeed

  document.title = "Yapping"
</script>

<!-- Tab bar: Mengikuti / Terbaru / Terpercaya -->
<div class="sticky top-0 z-40 flex border-b border-solid border-[#2d0a0a] bg-[#0a0505]/90 backdrop-blur-md">
  <Button
    class="flex-1 bg-transparent py-4 font-bold text-accent"
    on:click={createNote}>
    Mengikuti
  </Button>
  <Button
    class="flex-1 bg-transparent py-4 text-[#8e6e6e]"
    on:click={createNote}>
    Terbaru
  </Button>
  <Button
    class="flex-1 bg-transparent py-4 text-[#8e6e6e]"
    on:click={createNote}>
    <span class="mx-auto flex items-center justify-center gap-1">Terpercaya</span>
  </Button>
</div>

<!-- Anon banner -->
{#if !$pubkey}
  <div class="flex items-center gap-2 border-b border-solid border-[#2d0a0a] bg-accent/10 px-6 py-2">
    <span class="text-[18px] text-accent"><MaterialIcon name="shield" /></span>
    <span class="text-sm text-accent">Anonimitas Terjamin. End-to-end encrypted on Nostr relays.</span>
  </div>
{/if}

<!-- Composer -->
<div class="border-b border-solid border-[#2d0a0a] bg-[#191212] p-4">
  {#if $pubkey}
    <div class="flex cursor-pointer gap-4" on:click={createNote}>
      <button class="text-lg font-bold">
        <div class="w-12 rounded-full bg-[#302828]" />
      </button>
      <div class="flex flex-1 flex-col">
        <div class="mb-4 h-16 cursor-text text-[#8e6e6e]">Apa yang terjadi? Speak freely.</div>
        <div class="flex items-center justify-between border-t border-solid border-[#2d0a0a] pt-3">
          <div class="flex gap-2 text-accent">
            <button class="rounded-full p-2 hover:bg-[#302828]"><MaterialIcon name="image" /></button>
            <button class="rounded-full p-2 hover:bg-[#302828]"><MaterialIcon name="sentiment_satisfied" /></button>
          </div>
          <Button class="yap-btn px-6 py-2 font-bold" on:click={createNote}>Yap</Button>
        </div>
      </div>
    </div>
  {:else}
    <div class="py-8 text-center">
      <p class="text-xl">Belum punya akun?</p>
      <p>
        Klik <Button
          class="bg-transparent p-0 text-inherit underline"
          on:click={showLogin}>di sini</Button> untuk gabung ke jaringan nostr.
      </p>
    </div>
  {/if}
</div>

<div>
  <Feed feed={initialFeed} />
</div>