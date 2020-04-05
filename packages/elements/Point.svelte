<script>
import { getContext, onDestroy } from 'svelte';
import { writable } from 'svelte/store';

import { updateExtents, removeExtent } from '@graph-paper/datagraphic/extents';

export let x;
export let y;
export let size = 2;
export let alpha = 1;
export let colorAlpha = 1;
export let color = 'black';
export let stroke = color;
export let strokeWidth = 0;
export let strokeAlpha = 1;

const xScale = getContext('xScale') || writable((v) => v);
const yScale = getContext('yScale') || writable((v) => v);

// should we be updating extents here?

const xExtents = getContext('gp:datagraphic:xExtents');
const yExtents = getContext('gp:datagraphic:yExtents');

export const key = Math.random()
  .toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15);

$: updateExtents(xExtents, key, [x]);
$: updateExtents(yExtents, key, [y]);

function destroy() {
  removeExtent(xExtents, key);
  removeExtent(yExtents, key);
}

onDestroy(destroy);

// $: console.log($xScale.domain());
// $: console.log('point', $xScale(x));

</script>

<circle
  cx={$xScale(x) || 0}
  cy={$yScale(y) || 0}
  r={size}
  opacity={alpha}
  fill={color}
  fill-opacity={colorAlpha}
  stroke={stroke}
  stroke-width={strokeWidth}
  stroke-opacity={strokeAlpha}
/>
