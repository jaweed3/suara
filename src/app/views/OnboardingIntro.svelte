<script lang="ts">
  import Button from "src/partials/Button.svelte"
  import MaterialIcon from "src/partials/MaterialIcon.svelte"

  export let setStage

  const next = () => setStage("keys")

  const cards = [
    {
      icon: "shield",
      title: "Aman",
      desc: "Bisa anonim, gak ada yang bisa nge-trace kamu.",
    },
    {
      icon: "lock",
      title: "Milikmu",
      desc: "Kuncimu cuma di kamu, gak di server siapa-siapa.",
    },
    {
      icon: "chat_bubble",
      title: "Didengar",
      desc: "Curhat dijawab orang yang ngerti, bukan yang ngehakimin.",
    },
  ]
</script>

<div class="flex gap-3">
  <p
    class="-ml-1 -mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-lg">
    1/4
  </p>
  <p class="text-2xl font-bold">Lu gak sendirian. Gaspol.</p>
</div>
<p class="text-neutral-100">
  Kerjaan numpuk, ortu butuh biaya, anak juga ditagih-tagih. Dituntut terus, diminta terus.
  Capek kan? Banyak yang ngerasain hal yang sama di sini.
</p>
<div class="flex flex-col gap-3">
  {#each cards as card}
    <div class="flex items-start gap-4 rounded-lg border border-solid border-[#2d0a0a] bg-[#211a1a] p-4">
      <MaterialIcon name={card.icon} className="mt-0.5 text-2xl text-accent" />
      <div class="flex flex-col">
        <strong class="font-headline text-[15px] text-[#eedfde]">{card.title}</strong>
        <p class="text-sm text-[#e7bcbb]">{card.desc}</p>
      </div>
    </div>
  {/each}
</div>
<p>Gak perlu ngerti teknis. Gak perlu takut. Tinggal mulut dibuka, cerita mengalir.</p>
<Button class="yap-btn px-6 py-3 font-bold" on:click={next}>Mulai</Button>