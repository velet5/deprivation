<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { ActionType, Drawing, type Moving, type Point } from '../model/actions/actions'
  import {
    BoundingRect as Rect,
    CanvasEllipse,
    CanvasRectangle,
  } from '../model/components/CanvasElement'
  import Ellipse from './canvas/Ellipse.svelte'
  import Rectangle from './canvas/Rectangle.svelte'
  import BoundingRect from './canvas/BoundingRect.svelte'

  const emit = createEventDispatcher()

  export let components: (CanvasRectangle | CanvasEllipse)[]
  export let width = 1000
  export let height = 1000
  export let zoom = 1
  export let drawing: Drawing | null
  export let action: ActionType

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
    const { x, y } = toPoint(ev)
    onStartMove(x, y)
  }

  const onMouseMove = (ev: MouseEvent) => {
    onMove(toPoint(ev))
  }

  const onMouseUp = (ev: MouseEvent) => {
    if (!isPressed) {
      return
    }
    isPressed = false
    onEndMove(toPoint(ev))
  }

  let bounds: Rect | null = null

  let svg: SVGSVGElement
  let viewport: SVGRectElement
  let selected: (CanvasRectangle | CanvasEllipse) | null = null

  $: svg && svg.style.setProperty('--zoom', `${zoom}`)
  $: selected && (bounds = selected!.boundingRect())

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight

    viewPortX = (w - width * zoom) / 2
    viewPortY = (h - height * zoom) / 2

    if (svg) {
      svg.setAttribute('width', `${w}px`)
      svg.setAttribute('height', `${h}px`)
    }
  }

  onMount(() => {
    resize()
    window.addEventListener('resize', resize)
  })

  let movingFn: ((point: Point) => void) | null = null
  let finishMovingFn: (() => void) | null = null

  const onStartMove = (x: number, y: number) => {
    console.log('onStartMove', x, y, action, drawing)

    if (drawing === Drawing.Rectangle) {
      const rect = new CanvasRectangle({ x, y, width: 1, height: 1 })

      components.push(rect)

      movingFn = (point: Point) => {
        const { x, y } = point
        const width = x - rect.origX
        const height = y - rect.origY

        rect.x = width > 0 ? rect.origX : x
        rect.y = height > 0 ? rect.origY : y

        rect.width = Math.abs(width)
        rect.height = Math.abs(height)

        components = components
      }
      finishMovingFn = () => {
        rect.reposition()
      }

      components = components
    } else if (drawing === Drawing.Ellipse) {
      const ellipse = new CanvasEllipse({
        x,
        y,
        width: 1,
        height: 1,
      })
      components.push(ellipse)
      components = components

      movingFn = (point: Point) => {
        const { x, y } = point
        const width = x - ellipse.origX
        const height = y - ellipse.origY

        ellipse.cx = ellipse.origX + width / 2
        ellipse.cy = ellipse.origY + height / 2

        ellipse.rx = Math.abs(width) / 2
        ellipse.ry = Math.abs(height) / 2

        components = components
      }
      finishMovingFn = () => {
        ellipse.reposition()
      }
    } else if (action === ActionType.Move) {
      const c = components.find((c) => c.contains(x, y))
      if (c == null) {
        return
      }
      selected = c
      emit('selection', c)
      movingFn = (point: Point) => {
        c.translate(point.x - x, point.y - y)
        components = components
      }
      finishMovingFn = () => {
        c.reposition()
      }
    }
  }

  const onMove = (point: Point) => {
    if (movingFn != null) {
      bounds = null
      movingFn(point)
    }
  }

  const onEndMove = (point: Point) => {
    if (movingFn != null) {
      movingFn(point)
    }
    if (finishMovingFn != null) {
      finishMovingFn()
    }
    if (drawing != null) {
      emit('drawingFinished')
    } else if (action == ActionType.Move) {
    }
    movingFn = null
    finishMovingFn = null
  }
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
          fill={elem.fill}
        />
      {:else if elem.type === 'ellipse'}
        <Ellipse
          cx={elem.cx + viewPortX}
          cy={elem.cy + viewPortY}
          rx={elem.rx}
          ry={elem.ry}
          fill={elem.fill}
        />
      {/if}
    {/each}
    {#if bounds != null}
      <BoundingRect
        xShift={viewPortX}
        yShift={viewPortY}
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
      />
    {/if}
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
