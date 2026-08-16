<script lang="ts">
  import {pubkey} from "@welshman/app"
  import Landing from "src/app/views/Landing.svelte"
  import Home from "src/app/views/Home.svelte"

  export let feed = null
  export let topic = null
</script>

{#if $pubkey}
  <Home {feed} {topic} />
{:else}
  <Landing />
{/if}