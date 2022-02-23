<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut as easing } from "svelte/easing";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fly, fade } from "svelte/transition";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { format } from "d3-format";
  import { DataGraphic } from "..";
  import Line from "../../elements/Line.svelte";
  import HorizontalWindow from "../../elements/HorizontalWindow.svelte";
  import MetricMouseover from "../../elements/MetricMouseover.svelte";
  import { Button } from "../../button";
  import { LeftAxis, BottomAxis, Marker } from "../../guides";

  const fadeParams = { duration: 100 };
  const flyParams = { duration: 300, x: 20, easing };
  const f = format(",.2f");

  let unfolded = true;

  const makeData = (ys) => {
    let y = ys;
    return Array.from({ length: 100 }).map((_, x) => {
      y += (Math.random() - 0.5) * 10;
      return { x, y };
    });
  };
  const data1 = makeData(50);
  const data2 = makeData(120);
  let xv = tweened(40, { duration: 1000, easing });
  let S = true;
  $: xv.set(Math.random() * 100);

  setInterval(() => {
    S = !S;
    xv.set(S ? 83 : 12);
  }, 1500);

  const datasets = [
    {
      data: data1,
      x: "x",
      y: "y",
      color: "blue",
      label: "stocks",
    },
    {
      data: data2,
      x: "x",
      y: "y",
      color: "red",
      label: "bonds",
    },
  ];

  const shadows = datasets.map((di) => {
    const dii = { ...di };
    dii.color = "black";
    return dii;
  });
</script>

<Button
  compact
  on:click={() => {
    unfolded = !unfolded;
  }}
>
  {unfolded ? "fold" : "unfold"}
</Button>

<DataGraphic
  width={800}
  height={800}
  left={200}
  right={200}
  top={300}
  bottom={300}
>
  <g slot="annotation" let:left let:right let:top let:bottom let:xScale>
    <g class:folded={!unfolded} class="layer" style="--tr: 2">
      {#if unfolded}
        <rect
          transition:fade={fadeParams}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
          fill="var(--cool-gray-250)"
        />
        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          slot=background-body
        </text>
      {/if}
    </g>

    <g class:folded={!unfolded} class="layer" style="--tr: 1;">
      {#if unfolded}
        <rect
          transition:fade={fadeParams}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
          fill="var(--cool-gray-150)"
          opacity=".8"
        />
        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          slot=background
        </text>
      {/if}
      <LeftAxis />
      <BottomAxis />
    </g>

    <g class:folded={!unfolded} class="layer" style="--tr: 0;">
      {#if unfolded}
        <rect
          transition:fade={fadeParams}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
          fill="hsl(201, 29%, 95%)"
          fill-opacity=".95"
          stroke="var(--cool-gray-400)"
          stroke-width="3"
          stroke-dasharray="10,3"
          stroke-opacity=".4"
          opacity=".8"
        />
        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          default {"<slot />"}
        </text>
      {/if}
    </g>
    <clipPath id="explanation-annotation">
      <rect
        style="--tr: 0;"
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
      />
    </clipPath>
    <clipPath id="explanation-body">
      <rect
        style="--tr: -1;"
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
      />
    </clipPath>
    <g class="layer" style="--tr: -1;" class:folded={!unfolded}>
      {#if unfolded}
        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          slot=body
        </text>
      {/if}
    </g>
    <g
      class="layer"
      style="--tr: -1; clip-path: url(#explanation-body)"
      class:folded={!unfolded}
    >
      {#if unfolded}
        <rect
          transition:fade={fadeParams}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
          fill="var(--cool-gray-subtle)"
          opacity="1"
          stroke="var(--cool-gray-300)"
          stroke-width="2"
        />
        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          slot=body
        </text>
      {/if}
      {#each datasets as d}
        <Line data={d.data} color={d.color} />
      {/each}
      {#if unfolded}
        <g opacity=".2">
          <Marker location={20}>first</Marker>
          <Marker location={72}>second</Marker>
          <HorizontalWindow value={$xv} datasets={shadows} let:output>
            <line
              x1={xScale(output[0].match.x)}
              x2={xScale(output[0].match.x)}
              y1={top}
              y2={bottom}
              stroke="var(--cool-gray-300)"
            />
            <MetricMouseover
              outlineColor="transparent"
              formatValue={f}
              point={output}
            />
          </HorizontalWindow>
        </g>
      {/if}
    </g>

    <g
      class:folded={!unfolded}
      class="layer"
      style="--tr: -2; clip-path: url(#explanation-annotation); opacity: .15;"
    >
      <HorizontalWindow value={$xv} datasets={shadows} let:output>
        <line
          x1={xScale(output[0].match.x)}
          x2={xScale(output[0].match.x)}
          y1={top}
          y2={bottom}
          stroke="var(--cool-gray-300)"
        />
        <MetricMouseover
          outlineColor="transparent"
          formatValue={f}
          point={output}
        />
      </HorizontalWindow>
    </g>

    <g class:folded={!unfolded} class="layer" style="--tr: -2;">
      {#if unfolded}
        <!-- <rect transition:fade={fadeParams} x={left} y={top} width={right - left} height={bottom - top} fill=white rx=5 ry=5 stroke=var(--cool-gray-400) stroke-width=1 stroke-dasharray=5,1 opacity=.7 /> -->
        <rect
          vector-effect="non-scaling-stroke"
          transition:fade={fadeParams}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
          fill="white"
          fill-opacity=".8"
          rx="5"
          ry="5"
          stroke="var(--cool-gray-400)"
          stroke-width="1"
          stroke-dasharray="5,1"
          opacity=".7"
        />

        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          slot=annotation
        </text>

        <g opacity=".1">
          <Marker location={20}>first</Marker>
          <Marker location={72}>second</Marker>
        </g>
      {/if}
      <Marker location={20}>first</Marker>
      <Marker location={72}>second</Marker>
    </g>

    <g class:folded={!unfolded} class="layer" style="--tr: -3;">
      {#if unfolded}
        <rect
          vector-effect="non-scaling-stroke"
          transition:fade={fadeParams}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
          fill="white"
          fill-opacity=".6"
          stroke="var(--cool-gray-400)"
          stroke-opacity=".5"
          stroke-width="1"
          stroke-dasharray="5,1"
        />
        <text
          class="slot"
          transition:fly={flyParams}
          x={right + 6}
          y={top + 12}
        >
          slot=interaction
        </text>
      {/if}
      <HorizontalWindow value={$xv} {datasets} let:output>
        <line
          x1={xScale(output[0].match.x)}
          x2={xScale(output[0].match.x)}
          y1={top}
          y2={bottom}
          stroke="var(--cool-gray-300)"
        />
        <MetricMouseover formatValue={f} point={output} />
      </HorizontalWindow>
    </g>
  </g>
</DataGraphic>

<style>
  .layer {
    --dist: 80px;
    --tr: 0;
    transform: translate(340px, calc(var(--dist) * var(--tr))) rotate(30deg)
      skewX(-30deg) scale(1, 0.8602);
    transition: transform 500ms;
  }

  .folded {
    transform: none;
  }

  .slot {
    font-weight: normal;
    font-size: 12px;
    fill: var(--cool-gray-750);
  }
</style>
