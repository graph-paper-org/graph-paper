<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount } from "svelte";
  import { format } from "d3-format";
  import { randomNormal } from "d3-random";
  import { timeFormat } from "d3-time-format";

  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut as easing } from "svelte/easing";
  import { DataGraphic } from "../../../datagraphic";
  import { LeftAxis, BottomAxis } from "../../../guides";
  import { Button } from "../../../button";
  import { LineChart } from "../../../icons";
  import { Line } from "../..";

  import HorizontalWindow from "./HorizontalWindow.svelte";
  import MetricMouseover from "./MetricMouseover.svelte";

  export let title = "A Graph";
  export let supertitle;
  export let description;

  const duration = 250;

  let data;
  let mounted = false;

  function redraw() {
    let v1 = 50 * 10 + Math.random() * 50;
    let v2 = 120 * 10;
    let startDate = new Date(2019, 4, 4);
    startDate.setDate(
      startDate.getDate() * Math.floor((Math.random() - 0.5) * 50)
    );
    data = Array.from({ length: Math.floor(150 + Math.random() * 100) }).map(
      (_, i) => {
        const date = new Date(+startDate);
        date.setDate(date.getDate() + i);
        v1 += randomNormal()() * 10;
        v2 += randomNormal(0.1)() * 10;
        return {
          date,
          v1,
          v2,
        };
      }
    );
  }

  onMount(() => {
    redraw();
    mounted = true;
  });

  $: datasets = [
    {
      data,
      x: "date",
      y: "v1",
      color: "var(--digital-blue-500)",
      label: "stonks",
    },
    {
      data,
      x: "date",
      y: "v2",
      color: "var(--pantone-red-500",
      label: "money",
    },
  ];
</script>

<Button compact level="medium" on:click={redraw}>
  <LineChart size={14} />
  redraw
</Button>
<div class="simple-graph">
  <div style="padding-left: 8px;">
    {#if supertitle}
      <div class="supertitle">{supertitle}</div>
    {/if}
    <h3>{title}</h3>
    {#if description}
      <div class="description">{description}</div>
    {/if}
  </div>
  {#if mounted}
    <DataGraphic
      width={60 * 12}
      height={400}
      left={48}
      right={120}
      xType="time"
      yType="linear"
      yMin={0}
      xDomainTween={{ duration, easing }}
      yDomainTween={{ duration, easing }}
    >
      <LeftAxis tickFormatter={format("$,.0r")} />
      <BottomAxis />
      <g slot="body">
        <Line {data} x="date" y="v1" />
        <Line {data} x="date" y="v2" color="var(--pantone-red-500)" />
      </g>
      <g slot="annotation" let:mousePosition let:xScale let:top let:bottom>
        <HorizontalWindow {datasets} value={mousePosition.x} let:output>
          {#if mousePosition.x}
            <text
              x={xScale(output[0].match.date)}
              y={top - 4}
              font-size="12"
              fill="var(--cool-gray-600)"
              text-anchor="middle"
            >
              {timeFormat("%b %d %Y")(output[0].match.date)}
            </text>
            <line
              x1={xScale(output[0].match.date)}
              x2={xScale(output[0].match.date)}
              y1={top}
              y2={bottom}
              stroke-dasharray="3,1"
              stroke="var(--cool-gray-300)"
            />
          {/if}

          <MetricMouseover point={output} formatValue={format("$,r")} />
        </HorizontalWindow>
      </g>
    </DataGraphic>
  {/if}
</div>

<style>
  .simple-graph {
    padding-top: var(--space-2x);
    padding-bottom: var(--space-2x);
  }

  h3 {
    font-size: var(--text-06);
    margin: 0;
  }

  .supertitle {
    font-size: var(--text-04);
    color: var(--cool-gray-600);
    text-transform: uppercase;
  }

  .description {
    font-style: italic;
    color: var(--cool-gray-650);
  }
</style>
