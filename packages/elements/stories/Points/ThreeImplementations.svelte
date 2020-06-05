<script>
  import { tweened } from "svelte/motion";
  import { cubicOut as easing } from "svelte/easing";
  import { randomNormal } from "d3-random";
  import DataGraphic from "../../../datagraphic/DataGraphic.svelte";
  import LeftAxis from "../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../guides/BottomAxis.svelte";
  import { Point } from "../..";
  import CanvasPoint from "./CanvasPoint.svelte";

  const r = randomNormal(50, 20);
  let length = 30000;
  let a = Array.from({ length }).map(() => ({ x: r(), y: r() }));
  let b = Array.from({ length }).map(() => ({ x: r(), y: r() }));
  let onoff = false;
  const make = () => {
    onoff = !onoff;
    return onoff ? a : b;
  };

  let data = tweened(make(), { duration: 300, easing });

  function oneCircle(cx, cy, r) {
    return `
M ${cx - r}, ${cy}
  a ${r},${r} 0 1,0 ${r * 2},0
  a ${r},${r} 0 1,0 ${-r * 2},0 Z
`;
  }

  function circles(d, x, y, xs, ys, r) {
    return d.map((di) => oneCircle(xs(di[x]), ys(di[y]), r)).join(" ");
  }

  let which = "path"; // circle, canvas
</script>

<button
  on:click={() => {
    data.set(make());
  }}>
  change data
</button>

<button
  on:click={() => {
    which = 'point';
  }}>
  point
</button>
<button
  on:click={() => {
    which = 'path';
  }}>
  path
</button>
<button
  on:click={() => {
    which = 'canvas';
  }}>
  canvas
</button>

<DataGraphic
  xDomain={[-50, 150]}
  yDomain={[-50, 150]}
  width={500}
  height={400}
  let:xScale
  let:yScale>
  <LeftAxis />
  <BottomAxis />
  {#if which === 'point'}
    <Point data={$data} scaling={false} />
  {/if}
  {#if which === 'path'}
    <path
      d={circles($data, 'x', 'y', xScale, yScale, 2)}
      fill="var(--digital-blue-500)" />
  {/if}
  {#if which === 'canvas'}
    <CanvasPoint data={$data} />
  {/if}

</DataGraphic>
