<script lang="ts">
  export let name: string
  export let fill = false
  export let className = ""
</script>

<span
  class="material-symbols-outlined inline-block select-none leading-none {className}"
  class:text-primary={fill}
  style={fill ? "font-variation-settings: 'FILL' 1" : ""}>{name}</span>