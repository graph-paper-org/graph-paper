<script>
import { getContext } from 'svelte';

export let minY;
export let maxY;
export let x;
export let previousX;
export let nextX;
export let color = 'var(--cool-gray-700)';
const xScale = getContext('xScale');
const yScale = getContext('yScale');

export let bandWidth = 10;
if ($xScale.type === 'scalePoint') bandWidth = $xScale.step();
else if (previousX && nextX) bandWidth = $xScale(nextX) - $xScale(previousX);
// is this clunky? sort of is?

</script>

{#if minY && maxY && x}
<g class='error-bar vertical-error-bar'>
  <line x1={$xScale(x)} x2={$xScale(x)} y1={$yScale(minY)} y2={$yScale(maxY)} stroke={color} />
  <line x1={$xScale(x) - bandWidth / 2} x2={$xScale(x) - bandWidth / 2} y1={$yScale(minY)} y2={$yScale(minY)} stroke={color} />
  <line x1={$xScale(x) - bandWidth / 2} x2={$xScale(x) - bandWidth / 2} y1={$yScale(maxY)} y2={$yScale(maxY)} stroke={color} />
</g>
{/if}