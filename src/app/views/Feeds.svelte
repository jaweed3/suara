<script lang="ts">
  import {pubkey} from "@welshman/app"
  import Button from "src/partials/Button.svelte"
  import Feed from "src/app/shared/Feed.svelte"
  import {router} from "src/app/util/router"
  import {defaultFeed} from "src/engine"

  export let feed = null

  const showLogin = () => router.at("login").open()

  const initialFeed = feed || $defaultFeed

  document.title = "Yapping"
</script>

{#if !$pubkey}
  <div class="py-16 text-center">
    <p class="text-xl">Belum punya akun?</p>
    <p>
      Klik <Button
        class="text-inherit cursor-pointer bg-transparent p-0 underline"
        on:click={showLogin}>di sini</Button> untuk gabung ke jaringan nostr.
    </p>
  </div>
{/if}

<div class="xl:-ml-40 xl:mr-40">
  <Feed showControls feed={initialFeed} />
</div>
