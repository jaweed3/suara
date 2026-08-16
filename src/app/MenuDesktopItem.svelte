<script lang="ts">
  import cx from "classnames"
  import Link from "src/partials/Link.svelte"

  export let path = null
  export let isActive = false
  export let modal = false

  $: className = cx(
    "flex items-center gap-3 rounded px-4 py-3 transition-colors duration-200 active:scale-95",
    $$props.class,
    {
      "bg-[#3b3332] font-bold text-accent": isActive,
      "text-[#e7bcbb] hover:bg-[#302828]": !isActive,
    },
  )
</script>

<Link {...$$props} {modal} class={className} href={path} on:click>
  <slot />
</Link>