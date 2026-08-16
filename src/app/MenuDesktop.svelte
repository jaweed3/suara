<script lang="ts">
  import {derived} from "svelte/store"
  import {ago, omit, spec, MINUTE} from "@welshman/lib"
  import {PublishStatus, LOCAL_RELAY_URL} from "@welshman/net"
  import {
    signer,
    pubkey,
    sessions,
    deriveProfileDisplay,
    displayProfileByPubkey,
    thunks,
    thunkIsComplete,
  } from "@welshman/app"
  import MenuItem from "src/partials/MenuItem.svelte"
  import FlexColumn from "src/partials/FlexColumn.svelte"
  import Link from "src/partials/Link.svelte"
  import Button from "src/partials/Button.svelte"
  import PersonCircle from "src/app/shared/PersonCircle.svelte"
  import PersonHandle from "src/app/shared/PersonHandle.svelte"
  import MaterialIcon from "src/partials/MaterialIcon.svelte"
  import MenuDesktopItem from "src/app/MenuDesktopItem.svelte"
  import MenuDesktopSecondary from "src/app/MenuDesktopSecondary.svelte"
  import {slowConnections} from "src/app/state"
  import {router} from "src/app/util/router"
  import {hasNewMessages, hasNewNotifications} from "src/engine"

  const {page} = router

  const createNote = () => router.at("notes/create").open()

  let subMenu

  $: hud = derived(thunks, $thunks => {
    let pending = 0
    let success = 0
    let failure = 0

    for (const thunk of $thunks) {
      if (thunk.event.pubkey !== $pubkey) {
        continue
      }

      if (thunk.event.created_at < ago(5, MINUTE)) {
        continue
      }

      const results = Object.values(omit([LOCAL_RELAY_URL], thunk.results))

      if (!thunkIsComplete(thunk)) {
        pending += 1
      } else if (results.some(spec({status: PublishStatus.Success}))) {
        success += 1
      } else {
        failure += 1
      }
    }

    return {pending, success, failure}
  })

  $: isFeedPage = Boolean($page?.path.match(/^\/(notes)?$/))
  $: isTrustPage = Boolean($page?.path.includes("web-of-trust"))
  $: userDisplay = deriveProfileDisplay($pubkey)
</script>

<nav class="bottom-sai left-sai top-sai fixed z-sidebar flex w-64 flex-col border-r border-solid border-[#2d0a0a] bg-[#191212] px-4 py-6 transition-colors">
  <div class="mb-6 px-1">
    <h1 class="font-headline text-[22px] font-bold leading-8 text-accent">Yapping</h1>
    <p class="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e6e6e]"
      >Resistance. Transparency. Sovereign.</p>
  </div>

  <div class="flex flex-1 flex-col gap-1">
    <MenuDesktopItem path="/notes" isActive={isFeedPage}>
      <MaterialIcon name="home" fill={isFeedPage} />
      <span>Home</span>
    </MenuDesktopItem>
    <MenuDesktopItem path="/search" isActive={$page?.path.startsWith("/search")}>
      <MaterialIcon name="explore" />
      <span>Discover</span>
    </MenuDesktopItem>
    <MenuDesktopItem path="/help/web-of-trust" isActive={isTrustPage}>
      <MaterialIcon name="verified_user" />
      <span>Trust Network</span>
    </MenuDesktopItem>
    <MenuDesktopItem modal path="/groups" isActive={$page?.path.startsWith("/groups")}>
      <MaterialIcon name="groups" />
      <span>Communities</span>
    </MenuDesktopItem>
    {#if $pubkey}
      <MenuDesktopItem path={router.at("people").of($pubkey).toString()} isActive={$page?.path.startsWith("/people")}>
        <MaterialIcon name="person" />
        <span>Profile</span>
      </MenuDesktopItem>
    {/if}
  </div>

  <div class="mt-auto pt-4">
    <Button
      class="yap-btn flex w-full items-center justify-center gap-2 py-3 font-bold"
      on:click={createNote}>
      <MaterialIcon name="campaign" className="text-[18px]" />
      <span>Yap</span>
    </Button>

    {#if $pubkey}
      <div class="mt-4 flex items-center gap-3 px-1">
        <Button class="flex items-center gap-2 text-start" on:click={() => (subMenu = "account")}>
          <PersonCircle class="h-10 w-10" pubkey={$pubkey} />
          <div class="flex min-w-0 flex-col">
            <span class="truncate text-sm font-semibold text-[#eedfde]">@{userDisplay}</span>
            <span class="flex items-center gap-1 font-mono text-xs text-[#8e6e6e]">
              <MaterialIcon name="lock" className="text-[12px] text-[#f23b0d]" />
              Secured
            </span>
          </div>
        </Button>
      </div>
    {:else}
      <Link modal class="yap-btn mt-4 flex items-center justify-center py-3" href="/login">
        Masuk
      </Link>
    {/if}

    {#if subMenu === "account"}
      <MenuDesktopSecondary onEscape={() => (subMenu = null)}>
        <MenuItem
          class="flex items-center gap-4 py-4 pl-8"
          href={router.at("people").of($pubkey).toString()}>
          <i class="fa fa-user-circle" /> Profile
        </MenuItem>
        <MenuItem class="flex items-center gap-4 py-4 pl-8" href="/settings/keys">
          <i class="fa fa-key" /> Keys
        </MenuItem>
        <MenuItem
          class="flex items-center gap-4 py-4 pl-8"
          href={router.at("invite/create").qp({initialPubkey: $pubkey}).toString()}>
          <i class="fa fa-paper-plane" /> Buat Undangan
        </MenuItem>
        <MenuItem class="flex items-center gap-4 py-4 pl-8" href="/logout">
          <i class="fa fa-right-to-bracket" /> Keluar
        </MenuItem>
      </MenuDesktopSecondary>
    {/if}
  </div>
</nav>