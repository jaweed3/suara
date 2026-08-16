<script lang="ts">
  import {onDestroy} from "svelte"
  import {throttle} from "throttle-debounce"
  import QrScanner from "qr-scanner"
  import Card from "src/partials/Card.svelte"
  import Spinner from "src/partials/Spinner.svelte"
  import {parseAnything} from "src/util/nostr"
  import Input from "src/partials/Input.svelte"
  import PersonSummary from "src/app/shared/PersonSummary.svelte"
  import Feed from "src/app/shared/Feed.svelte"
  import {makeFeed} from "src/domain"
  import {makeTagFeed} from "@welshman/feeds"
  import {DEFAULT_COMMUNITIES} from "src/lib/community"
  import SearchResults from "src/app/shared/SearchResults.svelte"
  import {router} from "src/app/util/router"
  import {searchTerm} from "src/app/state"

  const startScanner = () => {
    scanner = new Promise(resolve => {
      setTimeout(async () => {
        const scanner = new QrScanner(video, r => tryParseEntity(r.data), {
          returnDetailedScanResult: true,
        })

        await scanner.start()

        ready = true
        resolve(scanner)
      }, 1000)
    })
  }

  const stopScanner = () => {
    scanner?.then(async s => {
      await s.stop()
      await s.destroy()
    })

    scanner = null
  }

  const tryParseEntity = throttle(
    500,
    async entity => {
      const result = await parseAnything(entity)

      if (result.type === "npub") {
        router.at("people").of(result.data).replaceModal()
      } else if (result) {
        router.at(entity).replaceModal()
      }

      if (result) {
        stopScanner()
      }
    },
    {
      noTrailing: true,
    },
  )

  let video, scanner, ready

  onDestroy(() => {
    stopScanner()
    searchTerm.set(null)
  })
</script>

{#if scanner}
  {#await scanner}
    <Spinner>Loading your camera...</Spinner>
  {:then}
    <span />
  {/await}
  <div
    class="m-auto rounded border border-solid border-neutral-600 bg-neutral-800 p-4"
    class:hidden={!ready}>
    <video class="m-auto rounded" bind:this={video} />
  </div>
{:else}
  <div class="border-b border-solid border-[#2d0a0a] bg-[#191212] px-6 py-5">
    <h1 class="mb-1 font-headline text-2xl font-bold text-[#eedfde]">Discover</h1>
    <p class="mb-4 text-sm text-[#8e6e6e]">Cari orang, topik, atau komunitas di jaringan.</p>
    <Input autofocus class="!rounded-full border-solid border-[#2d0a0a] !bg-[#050202]" bind:value={$searchTerm}>
      <i slot="before" class="fa fa-search" />
      <i slot="after" class="fa fa-qrcode cursor-pointer" on:click={startScanner} />
    </Input>
  </div>
  <div class="relative max-h-full px-6 py-4">
    {#if !$searchTerm}
      <div class="mb-6 flex flex-col gap-3">
        <h2 class="font-headline text-lg font-bold text-[#eedfde]">Komunitas</h2>
        {#each DEFAULT_COMMUNITIES as c}
          <Card interactive class="flex items-center justify-between gap-3">
            <div>
              <strong class="text-[15px] text-[#eedfde]">{c.name}</strong>
              <p class="text-sm text-[#8e6e6e]">{c.description}</p>
            </div>
            <button
              class="yap-btn shrink-0 px-4 py-1.5 text-sm font-bold"
              on:click={() => router.at("topics").of(c.id).push()}>Masuk</button>
          </Card>
        {/each}
      </div>
      <h2 class="mb-3 font-headline text-lg font-bold text-[#eedfde]">Curhatan terbaru</h2>
      <Feed feed={makeFeed({definition: makeTagFeed("#curhat", "curhat")})} />
    {:else}
      <SearchResults replace term={searchTerm}>
        <div slot="result" let:result>
          {#if result.type === "topic"}
            <Card interactive>
              #{result.topic.name}
            </Card>
          {:else if result.type === "profile"}
            <Card interactive>
              <PersonSummary inert hideActions pubkey={result.id} />
            </Card>
          {/if}
        </div>
      </SearchResults>
    {/if}
  </div>
{/if}
