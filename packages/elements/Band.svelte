<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies
  import { fade } from "svelte/transition"; // eslint-disable-line import/no-extraneous-dependencies
  import * as SHAPE from "d3-shape";

  export let xScale = getContext("xScale") || writable((v) => v);
  export let yScale = getContext("yScale") || writable((v) => v);
  export let useXScale = true;
  export let useYScale = true;
  export let data;
  export let x = "x";
  export let yMin = "low";
  export let yMax = "high";
  export let color = "var(--cool-gray-200)";
  export let curve = "curveMonotoneX";
  export let blend = "multiply";

  const curveFunction = SHAPE[curve];

  let areaGenerator;
  $: areaGenerator = SHAPE.area()
    .defined((d) => d[yMin] !== undefined && d[yMax] !== undefined)
    .x((d) => (useXScale ? $xScale(d[x]) : d[x]))
    .y((d) => (useYScale ? $yScale(d[yMin]) : d[yMin]))
    .y1((d) => (useYScale ? $yScale(d[yMax]) : d[yMax]))
    .curve(curveFunction);
</script>

<g class="line-band">
  <path
    d={areaGenerator(data)}
    fill={color}
    in:fade
    style="mix-blend-mode: {blend};" />
</g>
