<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  export let icon: string
  export let selected: boolean = false
</script>

<div class="item" class:selected on:click={() => emit('click')}>
  <div class="icon">{icon}</div>
</div>

<style>
  :root {
    --transition: all 0.2s ease-in-out;
  }
  .item {
    --size: 24px;
    display: inline-block;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    width: var(--size);
    height: var(--size);
    text-align: center;
    vertical-align: baseline;
    transition: var(--transition);
    user-select: none;
  }

  .item:hover {
    background-color: #f0f0f0;
    transition: var(--transition);
  }

  .item.selected {
    background-color: rgb(209, 153, 56);
    transition: var(--transition);
  }

  .icon {
    display: inline-block;
  }
</style>
