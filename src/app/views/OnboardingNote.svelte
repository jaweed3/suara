<script lang="ts">
  import {onDestroy} from "svelte"
  import {Router, addMaximalFallbacks} from "@welshman/router"
  import {NOTE, makeEvent, own} from "@welshman/util"
  import {publishThunk} from "@welshman/app"
  import {makePow} from "src/util/pow"
  import EditorContent from "src/app/editor/EditorContent.svelte"
  import Button from "src/partials/Button.svelte"
  import {makeEditor} from "src/app/editor"

  export let state
  export let signup
  export let setStage

  const prev = () => setStage("follows")

  const skip = () => signup()

  const next = async () => {
    loading = true

    try {
      const content = editor.getText({blockSeparator: "\n"}).trim()

      // Publish our welcome note
      if (content) {
        const relays = Router.get().FromUser().policy(addMaximalFallbacks).getUrls()
        const template = makeEvent(NOTE, {content, tags: editor.storage.nostr.getEditorTags()})
        const event = await makePow(own(template, state.pubkey), 20).result

        await publishThunk({event, relays})
      }

      signup()
    } finally {
      loading = false
    }
  }

  const editor = makeEditor({
    submit: next,
    autofocus: true,
    content: "Hari ini gue ngerasa...",
  })

  let loading = false

  onDestroy(() => {
    editor.destroy()
  })
</script>

<div class="flex gap-3">
  <p
    class="-ml-1 -mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-lg">
    4/4
  </p>
  <p class="text-2xl font-bold">Lu siap. Gas curhat.</p>
</div>
<p>
  Cerita apa yang mau lu bagi? Gak perlu panjang, gak perlu sempurna. Inget — bisa anonim kapan aja.
</p>
<p>Daripada cuma baca, cobain dulu nulis—lu bisa mulai dari kalimat di bawah ini.</p>
<div class="border-l-2 border-solid border-neutral-600 pl-4">
  <EditorContent {editor} class="min-h-24" />
</div>
<div class="flex gap-2">
  <Button class="btn" on:click={prev}><i class="fa fa-arrow-left" /> Balik</Button>
  <Button class="btn btn-accent flex-grow text-center" {loading} on:click={next}>Gaspol</Button>
</div>
{#if loading}
  <p class="text-center">Sebentar, lagi nyiapin tanda tangan digital...</p>
{:else}
  <Button class="text-center" on:click={skip}>
    Skip, langsung ke komunitas <i class="fa fa-arrow-right" />
  </Button>
{/if}
