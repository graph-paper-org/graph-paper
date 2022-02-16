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
  export let outline = "transparent";
  export let outlineSize = outline !== "transparent" ? 1 : 0;
  export let alpha = 1;

  const xScale = getContext("xScale");
  const yScale = getContext("yScale");

  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

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

  function toParameters(xs, ys, xp, yp, xe, ye, s) {
    if (xs.type === "scaleBand") {
      return {
        x: xs(xp) + (xs.bandwidth() * (1 - s)) / 2,
        y: Math.min(ys(yp), ys(ye)),
        width: xs.bandwidth() * s,
        height: Math.abs(ys(ye) - ys(yp)),
        xEnd: xp,
        xStart: xe,
        yEnd: yp,
        yStart: ye,
      };
    }
    return {
      x: Math.min(xs(xp), xs(xe)),
      y: ys(yp) + (ys.bandwidth() * (1 - s)) / 2,
      width: Math.abs(xs(xe) - xs(xp)),
      height: ys.bandwidth() * s,
      xEnd: xp,
      xStart: xe,
      yEnd: yp,
      yStart: ye,
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

{#each intermediate as { x, y, width, height }, i}
  <rect
    shape-rendering="crispEdges"
    {x}
    {y}
    {width}
    {height}
    opacity={alpha}
    fill={color}
    stroke={outline}
    stroke-width={outlineSize}
  />
{/each}
