<script lang="ts">
  import {formatTimestamp} from "@welshman/lib"
  import {getAncestors, getIdOrAddress, type TrustedEvent} from "@welshman/util"
  import {Router} from "@welshman/router"
  import Button from "src/partials/Button.svelte"
  import PersonCircle from "src/app/shared/PersonCircle.svelte"
  import PersonName from "src/app/shared/PersonName.svelte"
  import {router} from "src/app/util"

  export let event: TrustedEvent
  export let showParent = true
  export let anchor = null

  $: ancestors = getAncestors(event)
  $: reply = ancestors.replies[0]
  $: root = ancestors.roots[0]

  $: showReply = reply && !ancestors.replies.includes(anchor) && showParent
  $: showRoot = root && !ancestors.roots.includes(anchor) && root !== reply && showParent

  const showPerson = () => router.at("people").of(event.pubkey).open()

  const goToDetail = () =>
    router
      .at("notes")
      .of(getIdOrAddress(event), {relays: Router.get().Event(event).limit(10).getUrls()})
      .push()

  const goToParent = () =>
    router
      .at("notes")
      .of(reply, {relays: Router.get().EventParents(event).limit(10).getUrls()})
      .open()

  const goToThread = () =>
    router
      .at("notes")
      .of(getIdOrAddress(event), {relays: Router.get().EventRoots(event).limit(10).getUrls()})
      .at("thread")
      .open()
</script>

<div class="flex items-start gap-3">
  <div class="shrink-0">
    <Button stopPropagation class="text-lg font-bold" on:click={showPerson}>
      <PersonCircle class="h-12 w-12" pubkey={event.pubkey} />
    </Button>
  </div>
  <div class="flex min-w-0 flex-grow flex-col gap-1">
    <div class="flex items-center gap-2">
      <Button stopPropagation class="min-w-0 truncate text-[15px] font-semibold" on:click={showPerson}>
        <PersonName pubkey={event.pubkey} />
      </Button>
      <div class="ml-auto flex shrink-0 items-center gap-3 text-xs">
        <Button
          stopPropagation
          on:click={goToDetail}
          class="whitespace-nowrap text-end text-neutral-100">
          {formatTimestamp(event.created_at)}
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        {#if showReply}
          <small class="text-neutral-100">
            <i class="fa fa-code-merge" />
            <Button stopPropagation class="underline" on:click={goToParent}>Lihat Parent</Button>
          </small>
        {/if}
        {#if showRoot}
          <small class="text-neutral-100">
            <i class="fa fa-code-pull-request" />
            <Button stopPropagation class="underline" on:click={goToThread}>Lihat Thread</Button>
          </small>
        {/if}
      </div>
    </div>
  </div>
</div>
