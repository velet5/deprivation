<script lang="ts">
  import type { CanvasEllipse, CanvasRectangle } from '../model/components/CanvasElement'
  import Ellipse from './canvas/Ellipse.svelte'
  import Rectangle from './canvas/Rectangle.svelte'
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  export let components: (CanvasRectangle | CanvasEllipse)[]
  export let width = 1000
  export let height = 1000
  export let zoom = 1

  let isPressed = false

  const getPosition = () => {
    const rect = svg.getBoundingClientRect()
    return {
      x: rect.x,
      y: rect.y,
    }
  }

  const toPoint = (ev: MouseEvent) => {
    const pos = getPosition()
    return {
      x: ev.clientX - pos.x,
      y: ev.clientY - pos.y,
    }
  }

  const onMouseDown = (ev: MouseEvent) => {
    isPressed = true
    emit('startMove', toPoint(ev))
  }

  const onMouseMove = (ev: MouseEvent) => {
    if (isPressed) {
      emit('move', toPoint(ev))
    }
  }

  const onMouseUp = (ev: MouseEvent) => {
    if (!isPressed) {
      return
    }
    isPressed = false
    emit('endMove', toPoint(ev))
  }

  let svg: SVGSVGElement

  $: svg && svg.style.setProperty('--zoom', `${zoom}`)
</script>

<div class="wrapper">
  <svg
    bind:this={svg}
    viewBox="0 0 {width} {height}"
    style="width: {width}px; height: {height}px;"
    on:mousedown={onMouseDown}
    on:mousemove={onMouseMove}
    on:mouseup={onMouseUp}
    on:mouseleave={onMouseUp}
  >
    {#each components as elem}
      {#if elem.type === 'rectangle'}
        <Rectangle x={elem.x} y={elem.y} width={elem.width} height={elem.height} />
      {:else if elem.type === 'ellipse'}
        <Ellipse cx={elem.cx} cy={elem.cy} rx={elem.rx} ry={elem.ry} />
      {/if}
    {/each}
  </svg>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }
  svg {
    --zoom: 1;
    border: 1px solid #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(var(--zoom));
  }
</style>
