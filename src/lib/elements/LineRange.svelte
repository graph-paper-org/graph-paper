<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext, onDestroy } from "svelte";
  import { updateExtents, removeExtent } from "../datagraphic/extents";

  export let data;
  export let x;
  export let y;
  export let xStart = 0;
  export let yStart = 0;
  export let size = 1;
  export let scaling = true;

  export let color = "var(--digital-blue-400)";
  export let alpha = 1;
  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const xScale = getContext("xScale");
  const yScale = getContext("yScale");

  let extent;
  let extentMinKey = `${key}-min`;
  let extentMaxKey = `${key}-max`;
  let startKey;
  let endKey;

  if ($xScale.type === "scaleBand") {
    extent = "yExtents";
    startKey = "yStart";
    endKey = "yEnd";
  } else if ($yScale.type === "scaleBand") {
    extent = "xExtents";
    startKey = "xStart";
    endKey = "xEnd";
  }

  const extentStore = getContext(`gp:datagraphic:${extent}`);

  function destroy() {
    if (scaling) removeExtent(extentStore, extentMinKey);
    if (scaling) removeExtent(extentStore, extentMaxKey);
  }

  onDestroy(destroy);

  function toParameters(xs, ys, xp, yp, xe, ye) {
    if (xs.type === "scaleBand") {
      return {
        x1: xs(xp) + xs.bandwidth() / 2,
        x2: xs(xp) + xs.bandwidth() / 2,
        y1: ys(yp),
        y2: ys(ye),
        xStart: xe,
        xEnd: xp,
        yStart: ye,
        yEnd: yp,
      };
    }
    return {
      x1: xs(xp),
      x2: xs(xe),
      y1: ys(yp) + ys.bandwidth() / 2,
      y2: ys(yp) + ys.bandwidth() / 2,
      xStart: xe,
      xEnd: xp,
      yStart: ye,
      yEnd: yp,
    };
  }

  let intermediate = [];
  $: if (data) {
    intermediate = data.map((di) =>
      toParameters(
        $xScale,
        $yScale,
        di[x],
        di[y],
        di[xStart] || 0,
        di[yStart] || 0,
        size
      )
    );
  } else {
    intermediate = [toParameters($xScale, $yScale, x, y, xStart, yStart, size)];
  }

  $: if (scaling)
    updateExtents(extentStore, extentMinKey, intermediate, startKey);
  $: if (scaling)
    updateExtents(extentStore, extentMaxKey, intermediate, endKey);
</script>

{#each intermediate as { x1, x2, y1, y2 }, i}
  <line
    shape-rendering="crispEdges"
    {x1}
    {x2}
    {y1}
    {y2}
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
