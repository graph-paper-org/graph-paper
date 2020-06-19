<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext, onDestroy } from "svelte";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { writable } from "svelte/store";

  import {
    updateExtents,
    removeExtent,
  } from "@graph-paper/datagraphic/extents";

  export let x;
  export let y;
  export let data;

  export let size = 2;
  export let alpha = 1;
  export let colorAlpha = 1;
  export let color = "black";
  export let stroke = color;
  export let strokeWidth = 0;
  export let strokeAlpha = 1;
  export let scaling = true;

  const xScale = getContext("xScale") || writable((v) => v);
  const yScale = getContext("yScale") || writable((v) => v);

  const xExtents = getContext("gp:datagraphic:xExtents");
  const yExtents = getContext("gp:datagraphic:yExtents");

  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  let intermediate = [];
  let xAccessor;
  let yAccessor;

  $: if (data) {
    intermediate = data;
    xAccessor = x;
    yAccessor = y;
  } else {
    intermediate = [{ x, y }];
    xAccessor = 'x';
    yAccessor = 'y';
  }

  $: if (scaling) updateExtents(xExtents, key, intermediate, "x");
  $: if (scaling) updateExtents(yExtents, key, intermediate, "y");

  function destroy() {
    if (scaling) removeExtent(xExtents, key);
    if (scaling) removeExtent(yExtents, key);
  }

  onDestroy(destroy);
</script>

{#each intermediate as point}
  <circle
    cx={($xScale(point[xAccessor]) + ($xScale.type === 'scaleBand' ? $xScale.bandwidth() / 2 : 0)) || -size}
    cy={($yScale(point[yAccessor]) + ($yScale.type === 'scaleBand' ? $yScale.bandwidth() / 2 : 0)) || -size}
    r={size}
    opacity={alpha}
    fill={color}
    fill-opacity={colorAlpha}
    {stroke}
    stroke-width={strokeWidth}
    stroke-opacity={strokeAlpha} />
{/each}
