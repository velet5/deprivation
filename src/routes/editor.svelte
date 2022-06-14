<script lang="ts">
  import { ActionType, Drawing } from '../model/actions/actions'

  import Canvas from '../components/Canvas.svelte'
  import ComponentOptions from '../components/ComponentOptions.svelte'
  import Toolbar from '../components/Toolbar.svelte'
  import {
    CanvasElementType,
    type CanvasEllipse,
    type CanvasRectangle,
  } from '../model/components/CanvasElement'

  let components: (CanvasRectangle | CanvasEllipse)[] = []
  let selected: CanvasRectangle | CanvasEllipse | null = null
  let toolbar: { removeSelection(): void } | null = null

  let drawing: Drawing | null = null
  let action: ActionType = ActionType.Move

  const onDraw = (ev: CustomEvent) => {
    console.log('draw', ev.detail)
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

  const onAction = (ev: CustomEvent) => {
    console.log('action', ev.detail)
    const type = ev.detail as ActionType
    switch (type) {
      case ActionType.Move:
        action = ActionType.Move
        break
    }
  }
</script>

<section class="toolbar">
  <Toolbar on:draw={onDraw} on:action={onAction} bind:this={toolbar} />
</section>
<section class="canvas">
  <Canvas
    {drawing}
    {action}
    {components}
    on:selection={(ev) => (selected = ev.detail)}
    on:drawingFinished={() => {
      drawing = null
      toolbar?.removeSelection()
    }}
  />
</section>
<section class="options">
  <ComponentOptions element={selected} on:fill={() => (components = components)} />
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

  .options {
    position: absolute;
    z-index: var(--toolbarZindex);
    right: 0;
    top: 0;
  }
</style>
