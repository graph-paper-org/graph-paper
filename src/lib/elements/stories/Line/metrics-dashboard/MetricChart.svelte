<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fade } from "svelte/transition";
  import { timeFormat } from "d3-time-format";
  import { format } from "d3-format";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut as easing } from "svelte/easing";

  import { outline } from "./outline";
  import { DataGraphic } from "../../../../datagraphic";
  import { Line, Band } from "../../..";
  import VerticalErrorBar from "../../../VerticalErrorBar.svelte";
  import LeftAxis from "../../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../../guides/BottomAxis.svelte";
  import { window1D } from "../../../../core/utils/window-functions";

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

  export let endMouseEvent;
  export let resetMouseClicks;

  let isComparing = false;
  let compareStart = {};
  let compareEnd = {};

  let xScale;
  let yScale;

  // formatters
  let dtfmt = timeFormat("%b %d, %Y");
  let percentage = format("+.2%");

  const dateDiff = (a, b) => Math.ceil(Math.abs(a - b) / (1000 * 60 * 60 * 24));

  function keyDown(evt) {
    if (evt.shiftKey) isComparing = true;
  }

  function keyUp() {
    if (isComparing) isComparing = false;
  }

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

  function percentageDifference(start, end) {
    return (end - start) / start;
  }

  $: if (mousePosition.x) xMouse = mousePosition;

  $: output =
    xMouse.x && xScale && xMouse.body
      ? get(data, xMouse.x, "date", xScale.domain())
      : data[data.length - 1];

  $: if (isComparing) {
    compareEnd = output;
  } else {
    compareStart = output;
  }
</script>

<svelte:window on:keydown={keyDown} on:keyup={keyUp} />

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
  xDomainTween={{ duration: 150, easing }}
  yDomainTween={{ duration: 200, easing }}
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
  on:mouseleave={resetMouseClicks}
>
  <g>
    <Band
      {data}
      x="date"
      yMin={`${y}Low`}
      yMax={`${y}High`}
      color="var(--cool-gray-200)"
      alpha={0.4}
    />
  </g>
  <g let:xScale let:yScale let:top let:bottom>
    {#if isComparing}
      <rect
        x={Math.min(xScale(compareStart.date), xScale(compareEnd.date))}
        y={top}
        width={Math.abs(xScale(compareStart.date) - xScale(compareEnd.date))}
        height={bottom - top}
        fill="var(--digital-blue-100)"
        opacity=".3"
      />
    {/if}
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
        fill="var(--pantone-red-100)"
      />
      <line
        x1={xScale(mouseDownValue.x)}
        x2={xScale(mouseDownValue.x)}
        y1={top}
        y2={bottom}
        stroke="var(--pantone-red-200)"
        stroke-width="2"
      />
      <line
        x1={xScale(mouseMoveValue.x)}
        x2={xScale(mouseMoveValue.x)}
        y1={top}
        y2={bottom}
        stroke="var(--pantone-red-200)"
        stroke-width="2"
      />
      <text
        transition:fade={{ duration: 75 }}
        x={Math.min(xScale(mouseDownValue.x), xScale(mouseMoveValue.x)) + 5}
        y={bottom - 5}
        font-size="11"
        style="text-transform: uppercase;"
        fill="var(--cool-gray-500)"
      >
        {dateDiff(mouseDownValue.x, mouseMoveValue.x)} days
      </text>
    {/if}
  </g>
  <g slot="body">
    <Line {data} x="date" {y} />
  </g>

  <g
    slot="interaction"
    let:left
    let:right
    let:top
    let:bottom
    let:xScale
    let:yScale
  >
    {#if output}
      <g transform="translate({xScale(output.date)} 0)">
        <VerticalErrorBar minY={output[`${y}Low`]} maxY={output[`${y}High`]} />
        {#if !isComparing}
          <circle cy={yScale(output[y])} r="3" fill="var(--digital-blue-500)" />
        {/if}
        {#if isComparing}
          <rect
            y={Math.min(yScale(compareStart[y]), yScale(compareEnd[y]))}
            height={Math.abs(yScale(compareStart[y]) - yScale(compareEnd[y]))}
            width={5}
            fill={compareStart.date < compareEnd.date
              ? "var(--cool-gray-900)"
              : "var(--pantone-red-500"}
          />
          <g>
            <text
              use:outline
              class="comparison__text"
              text-anchor={compareStart.date > compareEnd.date
                ? "end"
                : "start"}
              dx={compareStart.date > compareEnd.date ? "-1em" : "1em"}
              y={yScale(output[y])}
            >
              {hoverFormat(compareEnd[y])}
            </text>
            <text
              use:outline
              class="comparison__text"
              dx={compareStart.date > compareEnd.date ? "-1em" : "1em"}
              dy="1em"
              text-anchor={compareStart.date > compareEnd.date
                ? "end"
                : "start"}
              y={yScale(output[y])}
              fill={compareStart[y] < compareEnd[y]
                ? "var(--cool-gray-900)"
                : "var(--pantone-red-500)"}
            >
              {percentage(percentageDifference(compareStart[y], compareEnd[y]))}
            </text>
          </g>
          <line class="comparison__line" y1={top} y2={bottom} />
        {/if}
      </g>
    {/if}

    {#if output.date}
      <text use:outline x={left} y={12} font-size={12}>
        {dtfmt(output.date)}
      </text>
    {/if}
    {#if isComparing}
      <line
        shape-rendering="crispEdges"
        x1={xScale(compareStart.date)}
        x2={xScale(compareEnd.date)}
        y1={yScale(compareStart[y])}
        y2={yScale(compareStart[y])}
        stroke="var(--cool-gray-900)"
        stroke-dasharray="1,1"
      />
      <line
        class="comparison__line"
        x1={xScale(compareStart.date)}
        x2={xScale(compareStart.date)}
        y1={top}
        y2={bottom}
      />
      <text
        use:outline
        class="comparison__text"
        y={yScale(compareStart[y])}
        x={xScale(compareStart.date)}
        text-anchor={compareStart.date < compareEnd.date ? "end" : "start"}
        dx={compareStart.date < compareEnd.date ? "-1em" : "1em"}
      >
        {hoverFormat(compareStart[y])}
      </text>
    {/if}
  </g>
</DataGraphic>

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

  .comparison__line {
    shape-rendering: crispEdges;
    stroke: var(--digital-blue-200);
  }

  .comparison__text {
    font-size: 12px;
  }
</style>
