<script lang="ts">
  import {pubkey, signer} from "@welshman/app"
  import {slide, fly} from "src/util/transition"
  import Input from "src/partials/Input.svelte"
  import Button from "src/partials/Button.svelte"
  import Link from "src/partials/Link.svelte"
  import SearchResults from "src/app/shared/SearchResults.svelte"
  import PersonCircle from "src/app/shared/PersonCircle.svelte"
  import PersonBadge from "src/app/shared/PersonBadge.svelte"
  import {menuIsOpen, searchTerm} from "src/app/state"
  import {router} from "src/app/util/router"
  import {hasNewMessages, hasNewNotifications} from "src/engine"

  let innerWidth = 0
  let searching = false
  let searchInput

  const {page} = router

  const openMenu = () => menuIsOpen.set(true)

  const openSearch = () => router.at("/search").open()

  const onSearchBlur = () => searchTerm.set(null)

  const onSearchKeydown = e => {
    if (e.key === "Escape") {
      searchTerm.set(null)
    }
  }

  const createNote = () => {
    if (!$pubkey) {
      return router.at("/login").open()
    }

    const params = {} as any
    const props = router.getProps($page) as any

    if ($page.path.startsWith("/people") && props.pubkey) {
      params.pubkey = props.pubkey
    }

    router.at("notes/create").qp(params).open()
  }
</script>

<svelte:window bind:innerWidth />

<!-- top nav -->
{#if innerWidth >= 1024}
  <div class="top-sai left-sai right-sai fixed z-nav">
    <div class="flex h-16 items-center justify-end gap-8 bg-[#191212] pl-64 pr-8">
      <div class="relative">
        <div class="flex">
          <Input
            dark
            class="border-solid border-[#2d0a0a] bg-[#050202] py-px outline-none"
            on:blur={onSearchBlur}
            on:keydown={onSearchKeydown}
            bind:element={searchInput}
            bind:value={$searchTerm} />
          <Button class="btn z-feature -ml-2 border-none !bg-accent !text-white"
            >Cari</Button>
        </div>
        {#if $searchTerm}
          <div
            on:mousedown|preventDefault
            out:fly|local={{y: 20, duration: 200}}
            class="absolute right-0 top-10 w-96 rounded opacity-100 shadow-2xl transition-colors">
            <div class="max-h-[70vh] overflow-auto rounded bg-[#211a1a]">
              <SearchResults bind:searching term={searchTerm}>
                <div
                  slot="result"
                  let:result
                  class="cursor-pointer px-4 py-2 transition-colors hover:bg-[#302828]">
                  {#if result.type === "topic"}
                    #{result.topic.name}
                  {:else if result.type === "profile"}
                    <PersonBadge inert pubkey={result.id} />
                  {/if}
                </div>
              </SearchResults>
            </div>
            {#if searching}
              <div
                transition:slide|local={{duration: 200, delay: 100}}
                class="flex justify-center gap-2 bg-[#191212] px-4 py-2 text-[#8e6e6e]">
                <div>
                  <i class="fa fa-circle-notch fa-spin" />
                </div>
                Memuat lebih banyak...
              </div>
            {/if}
          </div>
        {/if}
      </div>
      {#if $signer}
        <Button class="yap-btn rounded px-6 py-2 font-bold" on:click={createNote}>Yapping +</Button>
      {:else if !$pubkey}
        <Link modal class="btn yap-btn rounded px-6 py-2 font-bold" href="/login">Masuk</Link>
      {/if}
    </div>
  </div>
{/if}

<!-- bottom nav -->
{#if innerWidth < 1024}
  <div
    class="px-sai pb-sai fixed bottom-0 left-0 right-0 z-nav border-t border-solid border-[#2d0a0a] bg-[#0a0505]/90 backdrop-blur-xl">
    <div class="flex items-center justify-between px-4 py-2">
      <div class="w-1/3">
        <div
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-accent"
          on:click={openSearch}>
          <i class="fa fa-search -mb-1 -mr-1 text-xl" />
        </div>
      </div>
      <div>
        {#if $signer}
          <Button class="yap-btn rounded-full px-6 py-2 font-bold" on:click={createNote}>Yap</Button>
        {:else if !$pubkey}
          <Link modal class="btn yap-btn rounded-full px-6 py-2 font-bold" href="/login">Masuk</Link>
        {/if}
      </div>
      <div class="relative flex w-1/3 justify-end">
        <div class="flex cursor-pointer items-center" on:click={openMenu}>
          {#if $signer}
            <PersonCircle class="h-10 w-10" pubkey={$pubkey} />
            {#if $hasNewNotifications || $hasNewMessages}
              <div class="absolute right-1 top-1 h-2 w-2 rounded bg-accent" />
            {/if}
          {:else}
            <span class="material-symbols-outlined text-[28px] text-[#8e6e6e]">menu</span>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
