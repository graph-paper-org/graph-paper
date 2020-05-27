<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fade } from "svelte/transition";
  import { timeFormat } from "d3-time-format";

  import { DataGraphic } from "../../../../datagraphic";
  import { Line, Band, Point } from "../../..";
  import VerticalErrorBar from "../../../VerticalErrorBar.svelte";
  import LeftAxis from "../../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../../guides/BottomAxis.svelte";
  import { window1D } from "../../../../core/utils/window-functions";

  // import Window1D from "../Window1D.svelte";

  export let name;

  export let data;
  export let width = 350;
  export let height = 200;
  export let y;
  export let mousePosition = {};
  export let xDomain;
  export let yMin = 0;
  export let yMax;
  export let mouseDownValue = {};
  export let mouseMoveValue = {};

  export let xMouse = {};

  export let axisFormat = (v) => v;
  export let hoverFormat = (v) => v;

  export let hoverPt = {};

  // these functions should fire off as events.
  export let endMouseEvent;
  export let resetMouseClicks;

  // I don't even know anymore.
  export let compareStart = {};
  export let compareEnd = {};
  export let isComparing = false;

  let xScale;
  let yScale;

  let dtfmt = timeFormat("%b %d, %Y");

  const dateDiff = (a, b) => Math.ceil(Math.abs(a - b) / (1000 * 60 * 60 * 24));

  $: if (mousePosition.x) xMouse = mousePosition;

  const get = (d, v, k, dom) => {
    const w = window1D({
      value: v,
      data: d,
      key: k,
      lowestValue: dom[0],
      highestValue: dom[1],
    });
    if (w.current) return w.current;
    return 0;
  };

  $: output =
    xMouse.x && xScale && xMouse.body
      ? get(data, xMouse.x, "date", xScale.domain())
      : data[data.length - 1];
</script>

<style>
  header {
    display: grid;
    grid-template-columns: auto auto;
    margin: 0;
    padding: 0;
    padding-left: 36px;
    padding-right: 24px;
    color: var(--cool-gray-750);
  }

  h2 {
    margin: 0;
    font-size: 16px;
  }

  header div {
    justify-self: end;
  }
</style>

<header>
  <h2>{name}</h2>
  <div>{hoverFormat(output[y])}</div>
</header>

<DataGraphic
  {width}
  {height}
  top={32}
  bottom={24}
  left={36}
  right={24}
  {xDomain}
  xDomainTween={{ duration: 150 }}
  yDomain={[yMin, yMax]}
  xType="time"
  yType="linear"
  bind:xScale
  bind:yScale
  let:left
  let:right
  bind:mousePosition
  on:mousedown={() => {
    mouseDownValue = mousePosition;
  }}
  on:mousemove={() => {
    if (mouseDownValue) {
      mouseMoveValue = mousePosition;
    }
  }}
  on:mouseup={endMouseEvent}
  on:mouseleave={resetMouseClicks}>
  <g slot="body-background">
    <Band
      {data}
      x="date"
      yMin={`${y}Low`}
      yMax={`${y}High`}
      color="var(--cool-gray-200)"
      alpha={0.4} />
  </g>
  <g slot="background">
    <LeftAxis tickColor="var(--cool-gray-150)" tickFormatter={axisFormat} />
    <BottomAxis lineStyle="long" tickColor="var(--cool-gray-150)" />
  </g>
  <g slot="body-background" let:xScale let:yScale let:top let:bottom>
    {#if mouseDownValue.x && mouseMoveValue.x}
      <rect
        transition:fade={{ duration: 75 }}
        x={Math.min(xScale(mouseDownValue.x), xScale(mouseMoveValue.x))}
        y={top}
        width={Math.abs(xScale(mouseDownValue.x) - xScale(mouseMoveValue.x))}
        height={bottom - top}
        fill="var(--pantone-red-100)" />
      <line
        x1={xScale(mouseDownValue.x)}
        x2={xScale(mouseDownValue.x)}
        y1={top}
        y2={bottom}
        stroke="var(--pantone-red-200)"
        stroke-width="2" />
      <line
        x1={xScale(mouseMoveValue.x)}
        x2={xScale(mouseMoveValue.x)}
        y1={top}
        y2={bottom}
        stroke="var(--pantone-red-200)"
        stroke-width="2" />
      <text
        transition:fade={{ duration: 75 }}
        x={Math.min(xScale(mouseDownValue.x), xScale(mouseMoveValue.x)) + 5}
        y={bottom - 5}
        font-size="11"
        style="text-transform: uppercase;"
        fill="var(--cool-gray-500)">
        {dateDiff(mouseDownValue.x, mouseMoveValue.x)} days
      </text>
    {/if}

  </g>
  <g slot="body">

    <Line {data} x="date" {y} />

  </g>

  <!-- <g style="opacity:.6">
        <FirefoxReleaseVersionMarkers />
      </g> -->

  {#if output}
    <g>
      <VerticalErrorBar
        x={output.date}
        minY={output[`${y}Low`]}
        maxY={output[`${y}High`]} />

      <Point
        scaling={false}
        x={output.date}
        y={output[y]}
        size={3}
        color="var(--digital-blue-500)" />
    </g>
  {/if}

  {#if output.date}
    <text x={left} y={12} font-size={12}>{dtfmt(output.date)}</text>
    <!-- <g fill="var(--cool-gray-600)" style="font-variant-numeric: tabular-nums;">
      <text x={right} y={12} text-anchor="end" font-size={11}>
        lo {hoverFormat(output[`${y}Low`])}
      </text>
      <text x={right} y={26} text-anchor="end" font-size={11}>
        hi {hoverFormat(output[`${y}High`])}
      </text>
    </g> -->
  {/if}
  {#if isComparing}
    <text x={36} y={100}>{compareStart[y]}</text>
    <text x={36} y={110}>{compareEnd[y]}</text>
  {/if}
</DataGraphic>
