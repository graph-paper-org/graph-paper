<script>
  import { getContext, onDestroy } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies
  import * as SHAPE from "d3-shape";

  import {
    updateExtents,
    removeExtent,
  } from "@graph-paper/datagraphic/extents";

  export let xScale = getContext("xScale") || writable((v) => v);
  export let yScale = getContext("yScale") || writable((v) => v);
  export let useXScale = true;
  export let useYScale = true;
  export let data;
  export let scaling = false;
  export let x = "x";
  export let yMin = "low";
  export let yMax = "high";
  export let color = "var(--cool-gray-200)";
  export let curve = "curveLinear";
  export let alpha = 1;

  const curveFunction = SHAPE[curve];

  const yExtents = getContext("gp:datagraphic:yExtents");

  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  let keyMin = `${key}-min`;
  let keyMax = `${key}-max`;

  function destroy() {
    if (scaling) removeExtent(yExtents, keyMin);
    if (scaling) removeExtent(yExtents, keyMax);
  }

  onDestroy(destroy);

  $: if (scaling) {
    updateExtents(yExtents, keyMin, data, yMin);
    updateExtents(yExtents, keyMax, data, yMax);
  }

  let areaGenerator;
  $: areaGenerator = SHAPE.area()
    .defined((d) => d[yMin] !== undefined && d[yMax] !== undefined)
    .x((d) => (useXScale ? $xScale(d[x]) : d[x]))
    .y((d) => (useYScale ? $yScale(d[yMin]) : d[yMin]))
    .y1((d) => (useYScale ? $yScale(d[yMax]) : d[yMax]))
    .curve(curveFunction);
</script>

<svelte:options namespace="svg" />

<g class="line-band">
  <path d={areaGenerator(data)} fill={color} fill-opacity={alpha} />
</g>
