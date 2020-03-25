<script>
import { getContext } from 'svelte';
import { writable } from 'svelte/store';
import { fade } from 'svelte/transition';
import * as SHAPE from 'd3-shape';

export let xScale = getContext('xScale') || writable((v) => v);
export let yScale = getContext('yScale') || writable((v) => v);
export let useXScale = true;
export let useYScale = true;
export let data;
export let xAccessor = 'x';
export let yMinAccessor = 'low';
export let yMaxAccessor = 'high';
export let color = 'var(--cool-gray-200)';
export let curve = 'curveMonotoneX';
export let mixBlendMode = 'multiply';

const curveFunction = SHAPE[curve];

let areaGenerator;
$: areaGenerator = SHAPE.area()
  .x((d) => (useXScale ? $xScale(d[xAccessor]) : d[xAccessor]))
  .y((d) => (useYScale ? $yScale(d[yMinAccessor]) : d[yMinAccessor]))
  .y1((d) => (useYScale ? $yScale(d[yMaxAccessor]) : d[yMaxAccessor]))
  // .defined(d => d[xAccessor] >= $xScale.domain()[0] && d[xAccessor] <= $xScale.domain()[1])
  .curve(curveFunction);

</script>

<g class=line-band>
  <path 
    d={areaGenerator(data)} 
    fill={color} 
    in:fade
    style="mix-blend-mode: {mixBlendMode};" />
</g>