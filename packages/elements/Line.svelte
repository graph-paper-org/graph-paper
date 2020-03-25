<script>
import { getContext } from 'svelte';
import { writable } from 'svelte/store';
import { draw, fade } from 'svelte/transition';
import * as SHAPE from 'd3-shape';


export let xScale = getContext('xScale') || writable((v) => v);
export let yScale = getContext('yScale') || writable((v) => v);
export let xAccessor = 'x';
export let yAccessor = 'y';
export let useXScale = true;
export let useYScale = true;
export let data;
export let color = 'var(--digital-blue-500)';
export let areaColor = 'var(--digital-blue-400)';
export let strokeWidth = 1;
export let lineDrawAnimation = { duration: 0 };
export let curve = 'curveMonotoneX';
export let area = false;
const curveFunction = SHAPE[curve];
let lineGenerator;
let areaGenerator;
$: lineGenerator = SHAPE.line()
  .x((d) => (useXScale ? $xScale(d[xAccessor]) : d[xAccessor]))
  .y((d) => (useYScale ? $yScale(d[yAccessor]) : d[yAccessor]))
  .curve(curveFunction);

$: areaGenerator = SHAPE.area()
  .x((d) => $xScale(d[xAccessor]))
  .y1((d) => $yScale(d[yAccessor]))
  .y0($yScale.range()[0])
  .curve(curveFunction);

</script>

<g class=line>
  <path 
    stroke={color} 
    stroke-width={strokeWidth}
    fill=none 
    in:draw={lineDrawAnimation}
    d={lineGenerator(data)} />
  {#if area}
  <path 
    fill={areaColor} 
    in:fade
    d={areaGenerator(data)} />
  {/if}
</g>