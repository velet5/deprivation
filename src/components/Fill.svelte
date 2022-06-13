<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  export let fill: string

  $: fill && emit('change', fill)
</script>

<lable for="fill">Fill:</lable>
<input id="fill" type="color" bind:value={fill} />
