<script>
import { getContext, onDestroy } from 'svelte';
import { writable } from 'svelte/store';

import { updateExtents, removeExtent } from '@graph-paper/datagraphic/extents';

export let x;
export let y;
export let data;

export let size = 2;
export let alpha = 1;
export let colorAlpha = 1;
export let color = 'black';
export let stroke = color;
export let strokeWidth = 0;
export let strokeAlpha = 1;
export let scaling = true;
const xScale = getContext('xScale') || writable((v) => v);
const yScale = getContext('yScale') || writable((v) => v);

// should we be updating extents here?

const xExtents = getContext('gp:datagraphic:xExtents');
const yExtents = getContext('gp:datagraphic:yExtents');

export const key = Math.random()
  .toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15);

let intermediate = [];
$: if (data) {
  intermediate = data;// .map((di) => ({ x: di[x], y: di[y] }));
} else {
  intermediate = [{ x, y }];
}

$: if (scaling) updateExtents(xExtents, key, intermediate, 'x');
$: if (scaling) updateExtents(yExtents, key, intermediate, 'y');

function destroy() {
  if (scaling) removeExtent(xExtents, key);
  if (scaling) removeExtent(yExtents, key);
}

onDestroy(destroy);

</script>

{#each intermediate as point}
  <circle
    cx={$xScale(point.x) || -size}
    cy={$yScale(point.y) || -size}
    r={size}
    opacity={alpha}
    fill={color}
    fill-opacity={colorAlpha}
    stroke={stroke}
    stroke-width={strokeWidth}
    stroke-opacity={strokeAlpha}
  />
{/each}
