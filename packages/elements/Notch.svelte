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

  export let size = 1;
  export let pad = 0;
  export let alpha = .6;
  export let color = "black";

  const xScale = getContext("xScale") || writable((v) => v);
  const yScale = getContext("yScale") || writable((v) => v);

  let intermediate = [];
  let xAccessor;
  let yAccessor;

  function toAttributes(point, xs, ys, xp, yp, thick, pad) {
    if (xs.type === 'scaleBand') {
      return {
        x1: xs(point[xp]) + xs.bandwidth() * (pad) / 2,
        x2: xs(point[xp]) + xs.bandwidth() * (1-pad),
        y1: ys(point[yp]),
        y2: ys(point[yp])
      }
    } else if (ys.type === 'scaleBand') {
      return {
        x1: xs(point[xp]),
        x2: xs(point[xp]),
        y1: ys(point[yp]) + ys.bandwidth() * (pad) / 2,
        y2: ys(point[yp]) + ys.bandwidth() * (1-pad)
      }
    }
  }

  $: if (data) {
    intermediate = data.map(di => toAttributes(di, $xScale, $yScale, x, y, size, pad));

  } else {
    intermediate = [toAttributes({x, y}, $xScale, $yScale, 'x', 'y', size, pad)];
  }

</script>

{#each intermediate as {x1, x2, y1, y2}}
  <line
    shape-rendering=crispEdges
    {x1} {x2}
    {y1} {y2}
    stroke={color}
    opacity={alpha}
    stroke-width={size}
   />
{/each}
