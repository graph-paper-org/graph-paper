<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext, onDestroy } from "svelte";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { writable } from "svelte/store";

  import { updateExtents, removeExtent } from "../datagraphic/extents";

  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  export let x;
  export let y;
  export let data;

  export let size = 1;
  export let pad = 0;
  export let alpha = 1;
  export let scaling = true;
  export let color = "black";

  const xScale = getContext("xScale") || writable((v) => v);
  const yScale = getContext("yScale") || writable((v) => v);

  let intermediate = [];

  let extent;
  let valueKey;

  if ($xScale.type === "scaleBand") {
    extent = "yExtents";
    valueKey = "y";
  } else if ($yScale.type === "scaleBand") {
    extent = "xExtents";
    valueKey = "x";
  }

  const extentStore = getContext(`gp:datagraphic:${extent}`);

  function destroy() {
    if (scaling) removeExtent(extentStore, key);
  }

  onDestroy(destroy);

  function toAttributes(point, xs, ys, xp, yp, thick, p) {
    if (xs.type === "scaleBand") {
      return {
        x1: xs(point[xp]) + (xs.bandwidth() * p) / 2,
        x2: xs(point[xp]) + xs.bandwidth() * (1 - p),
        y1: ys(point[yp]),
        y2: ys(point[yp]),
        x: point[xp],
        y: point[yp],
      };
    }
    if (ys.type !== "scaleBand")
      throw Error("either xType or yType must be scaleBand");
    return {
      x1: xs(point[xp]),
      x2: xs(point[xp]),
      y1: ys(point[yp]) + (ys.bandwidth() * p) / 2,
      y2: ys(point[yp]) + ys.bandwidth() * (1 - p),
      x: point[xp],
      y: point[yp],
    };
  }

  $: if (data) {
    intermediate = data.map((di) =>
      toAttributes(di, $xScale, $yScale, x, y, size, pad)
    );
  } else {
    intermediate = [
      toAttributes({ x, y }, $xScale, $yScale, "x", "y", size, pad),
    ];
  }

  $: if (scaling) updateExtents(extentStore, key, intermediate, valueKey);
</script>

{#each intermediate as { x1, x2, y1, y2 }}
  <line
    shape-rendering="crispEdges"
    {x1}
    {x2}
    {y1}
    {y2}
    stroke={color}
    opacity={alpha}
    stroke-width={size}
  />
{/each}
