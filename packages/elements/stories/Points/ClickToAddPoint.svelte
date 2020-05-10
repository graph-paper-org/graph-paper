<script>
  import { randomNormal } from "d3-random";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { elasticOut as easing } from "svelte/easing";
  import DataGraphic from "../../../datagraphic/DataGraphic.svelte";
  import LeftAxis from "../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../guides/BottomAxis.svelte";
  import Point from "../../Point.svelte";

  const rnorm = randomNormal(50, 20);
  export let size = 3;
  export let alpha = 1;
  export let color = "red";
  export let colorAlpha = 1;
  export let stroke = "transparent";
  export let strokeAlpha = 1;
  export let strokeWidth = 1;

  // let clickedPoints = spring([], { damping: 0.6, stiffness: 0.1 });
  let clickedPoints = Array.from({ length: 30 }).map(() => ({
    x: rnorm(),
    y: rnorm(),
  }));

  let hoverSize = tweened(size, { duration: 400, easing });
  let mousePosition = {};

  function addPoint() {
    if (mousePosition.body) {
      clickedPoints.push({ ...mousePosition, body: 0 });
      clickedPoints = clickedPoints;
    }

    $hoverSize = size;
  }

  function changeSize() {
    $hoverSize = size + 12;
  }
</script>

<h2>{'<Point />'} – Click to add</h2>
<div>Click to add points to the graph.</div>
<div>Points added: {clickedPoints.length}</div>
<DataGraphic
  xType="linear"
  yType="linear"
  width={500}
  height={400}
  bind:mousePosition
  on:click={addPoint}
  on:mousedown={changeSize}
  on:mouseleave={() => {
    $hoverSize = size;
  }}>
  <LeftAxis />
  <BottomAxis />
  {#if mousePosition && mousePosition.body}
    <Point
      x={mousePosition.x}
      y={mousePosition.y}
      size={$hoverSize}
      alpha={0.5} />
  {/if}
  {#each clickedPoints as pt}
    <Point
      x={pt.x}
      y={pt.y}
      {size}
      {alpha}
      {color}
      {colorAlpha}
      {stroke}
      {strokeWidth}
      {strokeAlpha} />
  {/each}
</DataGraphic>
