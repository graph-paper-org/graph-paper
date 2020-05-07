<script>
  import { getContext, onDestroy } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  import { bin } from "d3-array";

  import {
    updateExtents,
    removeExtent,
  } from "@graph-paper/datagraphic/extents";

  export let data;
  export let bins = 30;
  export let binAccessor = "value";
  export let color = "var(--cool-gray-550)";
  export let stroke;
  export let alpha = 1;
  export let tweenParams = { duration: 0 };
  export let mixBlendMode = "normal";

  const tw = tweened(0, tweenParams);
  $: tw.set(1);

  export let xScale = getContext("xScale") || writable((v) => v);
  export let yScale = getContext("yScale") || writable((v) => v);

  const xExtents = getContext("gp:datagraphic:xExtents");
  const yExtents = getContext("gp:datagraphic:yExtents");

  export const key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  $: hist = bin()
    .value((d) => d[binAccessor])
    .thresholds(bins);

  $: outputData = hist(data).map((di) => ({
    x0: di.x0,
    x1: di.x1,
    length: di.length,
  }));
  $: extents = [outputData[0].x0, outputData[outputData.length - 1].x1];

  $: updateExtents(xExtents, key, extents);
  $: updateExtents(yExtents, key, outputData, "length");

  function destroy() {
    removeExtent(xExtents, key);
    removeExtent(yExtents, key);
  }

  onDestroy(destroy);
</script>

<g class="gp__element__histogram">
  {#each hist(data) as { values, x0, x1, length }, i (`${x0}-${x1}`)}
    <rect
      style="mix-blend-mode: {mixBlendMode};"
      opacity={alpha}
      fill={color}
      stroke={stroke || color}
      x={$xScale(x0)}
      y={$yScale(length) * $tw + $yScale(0) * (1 - $tw)}
      width={$xScale(x1) - $xScale(x0)}
      height={($yScale(0) - $yScale(length)) * $tw} />
  {/each}
</g>
