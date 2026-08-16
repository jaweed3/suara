<script lang="ts">
  import {onMount} from "svelte"
  import {Capacitor} from "@capacitor/core"
  import {getNip07, Nip07Signer, getNip55, Nip55Signer} from "@welshman/signer"
  import {loginWithNip55, loginWithNip07} from "@welshman/app"
  import {appName} from "src/partials/state"
  import Link from "src/partials/Link.svelte"
  import Button from "src/partials/Button.svelte"
  import FlexColumn from "src/partials/FlexColumn.svelte"
  import Heading from "src/partials/Heading.svelte"
  import {router} from "src/app/util/router"
  import {boot} from "src/app/state"

  // Define the interface for AppInfo
  interface AppInfo {
    name: string
    packageName: string
    iconUrl?: string
  }

  const signUp = () => router.at("signup").replaceModal()

  const useBunker = () => router.at("login/bunker").pushModal()

  const useExtension = async () => {
    const signer = new Nip07Signer()
    const pubkey = await signer.getPubkey()

    loginWithNip07(pubkey)
    boot()
  }

  const useSigner = async (app: AppInfo) => {
    const signer = new Nip55Signer(app.packageName)
    const pubkey = await signer.getPubkey()

    loginWithNip55(pubkey, app.packageName)
    boot()
  }

  let signerApps: AppInfo[] = []

  onMount(async () => {
    if (Capacitor.isNativePlatform()) {
      signerApps = await getNip55()
    }
  })

  document.title = "Masuk"
</script>

<div>
  <FlexColumn narrow large>
    <div class="text-center">
      <Heading>Selamat datang!</Heading>
      <p>
        {appName} dibangun di atas
        <Link class="underline" external href="https://nostr.com/">protokol nostr</Link>, yang
        bikin lu pemilik identitas sosial lu sendiri.
      </p>
    </div>
    <div class="relative flex flex-col gap-4">
      {#if getNip07()}
        <Button class="btn btn-tall btn-accent" on:click={useExtension}>
          <i class="fa fa-puzzle-piece" /> Pakai Ekstensi Browser
        </Button>
      {/if}
      {#each signerApps as app}
        <Button class="btn btn-tall" on:click={() => useSigner(app)}>
          <img src={app.iconUrl} alt={app.name} width="20" height="20" />
          Pakai {app.name}
        </Button>
      {/each}
      <Button class="btn btn-tall" on:click={useBunker}>
        <i class="fa fa-box" /> Pakai Remote Signer
      </Button>
      <Link external class="btn btn-tall btn-low" href="https://nostrapps.com/#signers">
        <i class="fa fa-compass" /> Cari Aplikasi Signer
      </Link>
    </div>
    <span class="text-center">
      Belum punya akun?
      <Button class="underline" on:click={signUp}>Daftar aja</Button>
    </span>
  </FlexColumn>
</div>
