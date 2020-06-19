<script>
import { getContext, onDestroy } from 'svelte';

export let data;
export let x;
export let y;
export let xStart = 0;
export let yStart = 0;
export let size = 1;
export let scaling = false;
export let color = 'var(--digital-blue-400)';
export let alpha = 1;

const xScale = getContext('xScale');
const yScale = getContext('yScale');

function toParameters(xs, ys, xp, yp, xe, ye, s) {
  if (xs.type === 'scaleBand') {
    return {
      x1: xs(xp) + xs.bandwidth() / 2,
      x2: xs(xp) + xs.bandwidth() / 2,
      y1: ys(yp),
      y2: ys(ye)
    }

  } else {
    return {

      x1: xs(xp),
      x2: xs(xe),
      y1: ys(yp) + ys.bandwidth() / 2,
      y2: ys(yp) + ys.bandwidth() / 2,
    }

  }
}


let intermediate = [];
$: if (data) {
  intermediate = data.map(di => {
    return toParameters($xScale, $yScale, di[x], di[y], di[xStart] || 0, di[yStart] || 0, size);
  });
} else {
  intermediate = [toParameters($xScale, $yScale, x, y, xStart, yStart, size)];
}

</script>

{#each intermediate as {x1, x2, y1, y2}, i}
  <line
    shape-rendering=crispEdges
    {x1} {x2}
    {y1} {y2}
    stroke={color}
    stroke-width={size}
    opacity={alpha}
  />
  <!-- <rect
    shape-rendering=crispEdges
    {x} {y} {width} {height}
    opacity={alpha}
    fill={color}
    stroke={outline}
    stroke-width={outlineSize}
  /> -->
{/each}
