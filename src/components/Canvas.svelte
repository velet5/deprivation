<script lang="ts">
  import type { CanvasEllipse, CanvasRectangle } from '../model/components/CanvasElement'
  import Ellipse from './canvas/Ellipse.svelte'
  import Rectangle from './canvas/Rectangle.svelte'
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  const emit = createEventDispatcher()

  export let components: (CanvasRectangle | CanvasEllipse)[]
  export let width = 1000
  export let height = 1000
  export let zoom = 1

  let isPressed = false
  let viewPortX = 0
  let viewPortY = 0

  const getPosition = () => {
    const rect = viewport.getBoundingClientRect()
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
  let viewport: SVGRectElement

  $: svg && svg.style.setProperty('--zoom', `${zoom}`)

  const moveComponent = (component: CanvasRectangle | CanvasEllipse, x: number, y: number) => {
    console.log('move', component, x, y)
    if (Number.isFinite(x) && Number.isFinite(y)) {
      switch (component.type) {
        case 'rectangle':
          break
      }
    }
  }

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight

    const prevX = viewPortX
    const prevY = viewPortY
    viewPortX = (w - width * zoom) / 2
    viewPortY = (h - height * zoom) / 2

    components.forEach((c) => moveComponent(c, viewPortX, viewPortY))
    components = components

    if (svg) {
      console.log('set')
      svg.setAttribute('width', `${w}px`)
      svg.setAttribute('height', `${h}px`)
    }
  }

  onMount(() => {
    resize()
    window.addEventListener('resize', resize)
  })
</script>

<div class="wrapper" on:resize={resize}>
  <svg
    bind:this={svg}
    on:mousedown={onMouseDown}
    on:mousemove={onMouseMove}
    on:mouseup={onMouseUp}
    on:mouseleave={onMouseUp}
    on:resize={resize}
  >
    <rect
      bind:this={viewport}
      class="viewport"
      x={viewPortX}
      y={viewPortY}
      {width}
      {height}
      fill-opacity="0"
      stroke="#ccc"
      stroke-width="0.7"
    />
    {#each components as elem}
      {#if elem.type === 'rectangle'}
        <Rectangle
          x={elem.x + viewPortX}
          y={elem.y + viewPortY}
          width={elem.width}
          height={elem.height}
        />
      {:else if elem.type === 'ellipse'}
        <Ellipse cx={elem.cx + viewPortX} cy={elem.cy + viewPortY} rx={elem.rx} ry={elem.ry} />
      {/if}
    {/each}
  </svg>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  .viewport {
    border: 1px solid #ccc;
  }

  svg {
    width: 100%;
    height: 100%;
    --zoom: 1;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
