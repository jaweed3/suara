<script lang="ts">
  import {pubkey} from "@welshman/app"
  import {makeTagFeed} from "@welshman/feeds"
  import Feeds from "src/app/views/Feeds.svelte"
  import {makeFeed} from "src/domain"
  import {userFollows} from "src/engine"

  export let feed = null
  export let topic = null

  // ponytail: tampilkan curhatan kalau belum login & belum follow, biar feed gak kosong.
  $: resolvedFeed = topic
    ? makeFeed({definition: makeTagFeed("#t", topic)})
    : feed ||
      (!$pubkey && $userFollows.size === 0
        ? makeFeed({definition: makeTagFeed("#t", "curhat")})
        : null)
</script>

<Feeds feed={resolvedFeed} />