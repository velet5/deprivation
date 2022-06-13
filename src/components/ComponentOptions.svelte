<script lang="ts">
  import type { CanvasEllipse, CanvasRectangle } from '../model/components/CanvasElement'
  import Fill from './Fill.svelte'
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  export let element: (CanvasRectangle | CanvasEllipse) | null = null

  const onFillChange = (color: CustomEvent) => {
    emit('fill', color.detail)
    element!.fill = color.detail
  }

  $: element && console.log('options', element)
</script>

<div class="wrapper">
  {#if element != null}
    {#if element.hasFill()}
      <Fill fill={element.fill} on:change={onFillChange} />
    {/if}
  {/if}
</div>

<style>
  .wrapper {
    background-color: #ddd;
    border: 0.5px solid #888;
    display: inline-block;
    min-width: 100px;
    min-height: 100px;
    padding: 10px;
  }
</style>
