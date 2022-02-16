<script>
  import { getContext, onDestroy } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies
  import { draw, fade } from "svelte/transition"; // eslint-disable-line import/no-extraneous-dependencies
  import * as SHAPE from "d3-shape";

  import { updateExtents, removeExtent } from "../datagraphic/extents";

  export let xScale = getContext("xScale") || writable((v) => v);
  export let yScale = getContext("yScale") || writable((v) => v);

  export let data;
  export let x = "x";
  export let y = "y";
  export let color = "var(--digital-blue-500)";
  export let size = 1;
  export let dashArray = "1,0";
  export let scaling = true;

  export let curve = "curveMonotoneX";

  export let area = false;
  export let areaColor = "var(--digital-blue-400)";

  export let lineDrawAnimation = { duration: 0 };

  export let useXScale = true;
  export let useYScale = true;

  const curveFunction = SHAPE[curve];
  let lineGenerator;
  let areaGenerator;

  const xExtents = getContext("gp:datagraphic:xExtents");
  const yExtents = getContext("gp:datagraphic:yExtents");

  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  function destroy() {
    if (scaling) removeExtent(xExtents, key);
    if (scaling) removeExtent(yExtents, key);
  }

  onDestroy(destroy);

  $: if (scaling) updateExtents(xExtents, key, data, x);
  $: if (scaling) updateExtents(yExtents, key, data, y);

  $: lineGenerator = SHAPE.line()
    .x(
      (d) =>
        (useXScale ? $xScale(d[x]) : d[x]) +
        ($xScale.type === "scaleBand" ? $xScale.bandwidth() / 2 : 0)
    )
    .y(
      (d) =>
        (useYScale ? $yScale(d[y]) : d[y]) +
        ($yScale.type === "scaleBand" ? $yScale.bandwidth() / 2 : 0)
    )
    .defined((d) => d[x] !== undefined && d[y] !== undefined)
    .curve(curveFunction);

  $: areaGenerator = SHAPE.area()
    .x(
      (d) =>
        $xScale(d[x]) +
        ($xScale.type === "scaleBand" ? $xScale.bandwidth() / 2 : 0)
    )
    .y1(
      (d) =>
        $yScale(d[y]) +
        ($yScale.type === "scaleBand" ? $yScale.bandwidth() / 2 : 0)
    )
    .y0($yScale.range()[0])
    .defined((d) => d[x] !== undefined && d[y] !== undefined)
    .curve(curveFunction);
</script>

<g class="line">
  <path
    stroke={color}
    stroke-width={size}
    stroke-dasharray={dashArray}
    fill="none"
    in:draw={lineDrawAnimation}
    d={lineGenerator(data)}
  />
  {#if area}
    <path fill={areaColor} in:fade d={areaGenerator(data)} />
  {/if}
</g>
