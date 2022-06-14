<script lang="ts">
  export let xShift = 0
  export let yShift = 0
  export let x = 0
  export let y = 0
  export let width = 1
  export let height = 1

  let cornerW = 6
  let cornerH = 6
</script>

<rect
  x={x + xShift}
  y={y + yShift}
  {width}
  {height}
  fill="#0099cc"
  fill-opacity="0"
  stroke="#0099cc"
  stroke-width="1"
  stroke-opacity="1"
/>

<rect
  class="corner"
  x={x + xShift - cornerW / 2}
  y={y + yShift - cornerH / 2}
  width={cornerW}
  height={cornerH}
  fill="#0099cc"
/>

<rect
  class="corner"
  x={x + xShift + width - cornerW / 2}
  y={y + yShift - cornerH / 2}
  width={cornerW}
  height={cornerH}
  fill="#0099cc"
/>

<rect
  class="corner"
  x={x + xShift - cornerW / 2}
  y={y + yShift + height - cornerH / 2}
  width={cornerW}
  height={cornerH}
  fill="#0099cc"
/>

<rect
  class="corner"
  x={x + xShift + width - cornerW / 2}
  y={y + yShift + height - cornerH / 2}
  width={cornerW}
  height={cornerH}
  fill="#0099cc"
/>

<style>
  .corner {
    cursor: pointer;
  }
</style>
