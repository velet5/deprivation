<script lang="ts">
  import {
    CanvasElementType,
    CanvasEllipse,
    CanvasRectangle,
  } from '../model/components/CanvasElement'
  import Canvas from '../components/Canvas.svelte'
  import Toolbar from '../components/Toolbar.svelte'

  enum Drawing {
    Rectangle = 'rectanlge',
    Ellipse = 'ellipse',
  }

  type Point = {
    x: number
    y: number
  }

  let drawing: Drawing | null = null
  let movingFn: ((point: Point) => void) | null = null

  const onDraw = (ev: CustomEvent) => {
    const type = ev.detail as CanvasElementType
    switch (type) {
      case CanvasElementType.Rectangle:
        drawing = Drawing.Rectangle
        break
      case CanvasElementType.Ellipse:
        drawing = Drawing.Ellipse
        break
    }
  }

  const onStartMove = (ev: CustomEvent) => {
    let { x, y } = ev.detail

    if (drawing === Drawing.Rectangle) {
      const rect = {
        type: CanvasElementType.Rectangle,
        origX: x,
        origY: y,
        x,
        y,
        width: 10,
        height: 10,
      } as CanvasRectangle
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

      components = components
    } else if (drawing === Drawing.Ellipse) {
      components.push({
        type: CanvasElementType.Ellipse,
        cx: x,
        cy: y,
        rx: 0,
        ry: 0,
      })
    }
  }

  const onMove = (ev: CustomEvent) => {
    if (movingFn != null) {
      movingFn(ev.detail as Point)
    }
  }

  const onEndMove = (ev: CustomEvent) => {
    drawing = null
    toolbar && toolbar.removeSelection()
    movingFn = null
  }

  let components: (CanvasRectangle | CanvasEllipse)[] = []

  let toolbar: { removeSelection(): void } | null = null
</script>

<section class="toolbar"><Toolbar on:draw={onDraw} bind:this={toolbar} /></section>
<section class="canvas">
  <Canvas {components} on:startMove={onStartMove} on:move={onMove} on:endMove={onEndMove} />
</section>

<style>
  :root {
    --canvaZindex: 1;
    --toolbarZindex: 2;
  }

  .toolbar {
    z-index: var(--toolbarZindex);
    position: absolute;
    top: 0;
    left: 0;
  }

  .canvas {
    z-index: var(--canvaZindex);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
