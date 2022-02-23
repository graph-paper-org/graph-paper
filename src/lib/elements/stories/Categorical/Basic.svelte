<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut as easing } from "svelte/easing";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { randomNormal } from "d3-random";
  import { DataGraphic } from "../../../datagraphic";
  import { Axis } from "../../../guides";
  import { Bar, LineRange, Point, Notch, Line, Band } from "../..";

  const LENGTH = 6;

  let r = randomNormal(0, 1);

  let width = 200;
  let height = 200;
  let tickColor = "var(--cool-gray-200)";

  let domain = Array.from({ length: LENGTH }).map((_, i) => i);

  const makeData = (length = LENGTH) =>
    Array.from({ length }).map((_, i) => {
      let xMax = 20 + Math.random() * 80;
      let xMin = xMax / 2;
      let median = (xMax + xMin) / 2 + r();
      let x75 = (xMax + median) / 2 + r();
      let x25 = (xMin + median) / 2 + r();
      let ri = randomNormal(median, 6);
      let notches = [xMin, ...Array.from({ length: 15 }).map(ri), xMax];
      return { y: i, median, xMin, xMax, x25, x75, notches };
    });

  let values = tweened(makeData(), { duration: 500, easing });

  setInterval(() => {
    $values = makeData();
  }, 700);

  let innerY = 0.5;
  let outerY = 0.5;
  let size = 1;

  let align = true;

  $: countDomain = align ? [0, 100] : [undefined, undefined];
</script>

<div>
  <code>yInnerPadding</code>
  <input type="range" bind:value={innerY} min="0" max="1" step=".01" />
</div>

<div>
  <code>yOuterPadding</code>
  <input type="range" bind:value={outerY} min="0" max="1" step=".01" />
</div>

<div>
  <code>size</code>
  <input type="range" bind:value={size} min="0" max="1" step=".01" />
</div>

<input type="checkbox" bind:checked={align} />

<div class="categorical-grid">
  <DataGraphic
    {width}
    {height}
    xType="linear"
    yType="scaleBand"
    yDomain={domain}
    xDomain={countDomain}
    yInnerPadding={innerY}
    yOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="short" />
      <Axis {tickColor} side="bottom" lineStyle="long" />
    </g>
    <g slot="body">
      <Bar data={$values} x="xMax" y="y" {size} />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    xType="scaleBand"
    yType="linear"
    xDomain={domain}
    yDomain={countDomain}
    xInnerPadding={innerY}
    xOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="long" />
      <Axis {tickColor} side="bottom" lineStyle="short" />
    </g>
    <g slot="body">
      <Bar data={$values} x="y" y="xMax" {size} />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    xType="linear"
    yType="scaleBand"
    yDomain={domain}
    xDomain={countDomain}
    yInnerPadding={innerY}
    yOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="short" />
      <Axis {tickColor} side="bottom" lineStyle="long" />
    </g>
    <g slot="body" let:xScale let:yScale>
      <LineRange data={$values} x="xMin" xStart="xMax" y="y" />
      <Point
        scaling={false}
        data={$values}
        x="xMin"
        y="y"
        color="white"
        strokeWidth={1}
        stroke="var(--digital-blue-400)"
      />
      <Point
        scaling={false}
        data={$values}
        x="xMax"
        y="y"
        color="var(--digital-blue-400)"
        strokeWidth={1}
        stroke="var(--digital-blue-400)"
      />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    yType="linear"
    xType="scaleBand"
    xDomain={domain}
    yDomain={countDomain}
    xInnerPadding={innerY}
    xOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="long" />
      <Axis {tickColor} side="bottom" lineStyle="short" />
    </g>
    <g slot="body" let:xScale let:yScale>
      <LineRange data={$values} y="xMin" yStart="xMax" x="y" />
      <Point
        scaling={false}
        data={$values}
        x="y"
        y="xMin"
        color="white"
        strokeWidth={1}
        stroke="var(--digital-blue-400)"
      />
      <Point
        scaling={false}
        data={$values}
        x="y"
        y="xMax"
        color="var(--digital-blue-400)"
        strokeWidth={1}
        stroke="var(--digital-blue-400)"
      />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    xType="linear"
    yType="scaleBand"
    yDomain={domain}
    xDomain={countDomain}
    yInnerPadding={innerY}
    yOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="short" />
      <Axis {tickColor} side="bottom" lineStyle="long" />
    </g>
    <g slot="body">
      <LineRange data={$values} x="xMin" xStart="xMax" y="y" />
      <Bar
        data={$values}
        x="x25"
        y="y"
        xStart="x75"
        color="white"
        outline="var(--digital-blue-400)"
      />
      <Notch data={$values} x="median" y="y" color="var(--digital-blue-400)" />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    yType="linear"
    xType="scaleBand"
    xDomain={domain}
    yDomain={countDomain}
    xInnerPadding={innerY}
    xOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="long" />
      <Axis {tickColor} side="bottom" lineStyle="short" />
    </g>
    <g slot="body">
      <LineRange data={$values} y="xMin" yStart="xMax" x="y" />
      <Bar
        data={$values}
        x="y"
        y="x75"
        yStart="x25"
        color="white"
        outline="var(--digital-blue-400)"
      />
      <Notch data={$values} x="y" y="median" color="var(--digital-blue-400)" />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    xType="linear"
    yType="scaleBand"
    yDomain={domain}
    xDomain={countDomain}
    yInnerPadding={innerY}
    yOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="short" />
      <Axis {tickColor} side="bottom" lineStyle="long" />
    </g>
    <g slot="body">
      {#each $values as { y, notches }}
        {#each notches as notch}
          <Notch x={notch} {y} color="var(--digital-blue-400)" />
        {/each}
      {/each}
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    yType="linear"
    xType="scaleBand"
    xDomain={domain}
    yDomain={countDomain}
    xInnerPadding={innerY}
    xOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="long" />
      <Axis {tickColor} side="bottom" lineStyle="short" />
    </g>
    <g slot="body">
      {#each $values as { y, notches }}
        {#each notches as notch}
          <Notch y={notch} x={y} color="var(--digital-blue-400)" />
        {/each}
      {/each}
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    xType="linear"
    yType="scaleBand"
    yDomain={domain}
    xDomain={countDomain}
    yInnerPadding={innerY}
    yOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="short" />
      <Axis {tickColor} side="bottom" lineStyle="long" />
    </g>
    <g slot="body">
      <Band
        data={$values}
        yMin="y"
        yMax="y"
        x="xMin"
        xEnd="xMax"
        color="var(--digital-blue-100)"
      />
      <Band
        data={$values}
        yMin="y"
        yMax="y"
        x="x25"
        xEnd="x75"
        color="var(--digital-blue-200)"
      />
      <Line data={$values} x="median" y="y" size={3} curve="curveLinear" />
    </g>
  </DataGraphic>

  <DataGraphic
    {width}
    {height}
    yType="linear"
    xType="scaleBand"
    xDomain={domain}
    yDomain={countDomain}
    xInnerPadding={innerY}
    xOuterPadding={outerY}
  >
    <g slot="background">
      <Axis {tickColor} side="left" lineStyle="long" />
      <Axis {tickColor} side="bottom" lineStyle="short" />
    </g>
    <g slot="body">
      <Band
        data={$values}
        x="y"
        yMin="xMin"
        yMax="xMax"
        color="var(--digital-blue-100)"
      />
      <Band
        data={$values}
        x="y"
        yMin="x25"
        yMax="x75"
        color="var(--digital-blue-200)"
      />
      <Line data={$values} y="median" x="y" size={3} curve="curveLinear" />
    </g>
  </DataGraphic>
</div>

<style>
  .categorical-grid {
    display: grid;
    grid-template-columns: max-content max-content max-content max-content;
    grid-column-gap: var(--space-2x);
    grid-row-gap: var(--space-2x);
  }
</style>
