<script lang="ts">
  import {appName} from "src/partials/state"
  import Heading from "src/partials/Heading.svelte"
  import Link from "src/partials/Link.svelte"
  import {toTitle} from "src/util/misc"

  export let topic

  const topics = ["web-of-trust", "nip-17-dms", "remote-signers"]
  const nip17Url = "https://github.com/nostr-protocol/nips/blob/master/17.md"
</script>

{#if topics.includes(topic)}
  <Heading>{toTitle(topic)}</Heading>
  {#if topic === "web-of-trust"}
    <p class="text-lg font-semibold">Di sini kamu bebas curhat. 🙌</p>
    <p>
      Mau cerita soal kerjaan yang bikin pusing? Soal ekonomi yang makin berat? Pengalaman toxic
      yang selama ini kamu pendam? Semua bisa dibahas di sini.
    </p>
    <p>
      Gak perlu takut dihakimi atau diem-diem disensor. {appName} dibangun supaya suaramu tetap
      aman dan didengar — tanpa khawatir identitasmu bocor atau pembalasan dari pihak yang gak
      nyaman dengan curhatanmu.
    </p>
    <p>
      Makin banyak orang tepercaya di jaringanmu, makin nyaman pula diskusinya. Kami bikin sistem
      ini otomatis — kamu tinggal yapping, sisanya kami yang jagain.
    </p>
  {:else if topic === "remote-signers"}
    <p>
      Nostr uses cryptographic key pairs instead of passwords to authenticate users. This means that
      you and nobody else controls your social identity - however it also requires some care to
      avoid losing your keys, or having them stolen.
    </p>
    <p>
      Instead of pasting your private key (also known as an "nsec") into every nostr app you use,
      it's wise to choose a single signer application to keep them for you.
    </p>
    <p>
      Some signers live on the internet, others can be installed on your phone or computer. If
      you're new to nostr, we recommend getting started with <Link
        external
        class="underline"
        href="https://nsec.app/">nsec.app</Link
      >.
    </p>
    <Link external class="btn btn-tall btn-low" href="https://nostrapps.com/#signers">
      <i class="fa fa-compass" /> Browse Signer Apps
    </Link>
  {:else if topic === "nip-17-dms"}
    <p>
      <Link class="underline" external href={nip17Url}>NIP 17</Link> improves upon the old NIP 04 direct
      messages standard by adding support for group chats and better metadata hiding.
    </p>
    <p>
      In the past, a significant amount of information about private messages was public, event
      though the content of the messages was encrypted. This meant that anyone could find out who
      you were sending messages to, and how frequently.
    </p>
    <p>
      The new messaging standard dramatically reduces the amount of information messages leak, and
      is built on a more robust encryption standard.
    </p>
  {/if}
{:else}
  <Heading>No information on "{toTitle(topic)}"</Heading>
  <p>Sorry, we couldn't find any information on "{toTitle(topic)}".</p>
{/if}
