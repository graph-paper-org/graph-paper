<script>
import { getContext } from 'svelte';

export let data;
export let x;
export let y;
export let xStart = 0;
export let yStart = 0;
export let size = 1;
export let color = 'var(--digital-blue-400)';
export let outline = 'transparent';
export let outlineSize = outline !== 'transparent' ? 1 : 0;
export let alpha = 1;

const xScale = getContext('xScale');
const yScale = getContext('yScale');

let intermediate = [];
$: if (data) {
  intermediate = data.map(di => {
    return toParameters($xScale, $yScale, di[x], di[y], di[xStart] || 0, di[yStart] || 0, size);
  });
} else {
  intermediate = [toParameters($xScale, $yScale, x, y, xStart, yStart, size)];
}

function toParameters(xs, ys, xp, yp, xe, ye, s) {
  if (xs.type === 'scaleBand') {
    return {
      rectX: xs(xp) + xs.bandwidth() * (1 - s) / 2,
      rectY:  Math.min(ys(yp), ys(ye)),
      width: xs.bandwidth() * s,
      height: Math.abs(ys(ye) - ys(yp))
    }

  } else {
    return {
      rectX: Math.min(xs(xp), xs(xe)),
      rectY:  ys(yp) + ys.bandwidth() * (1 - s) / 2,
      width: Math.abs(xs(xe) - xs(xp)),
      height: ys.bandwidth() * s,
    }

  }
}

</script>

{#each intermediate as params, i}
<rect
  shape-rendering=crispEdges
  x={params.rectX}
  y={params.rectY}
  width={params.width}
  height={params.height}
  opacity={alpha}
  fill={color}
  stroke={outline}
  stroke-width={outlineSize}
/>
{/each}
