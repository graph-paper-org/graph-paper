<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { csvParse } from "d3-dsv";
  import { format } from "d3-format";
  import { timeFormat } from "d3-time-format";
  import { DataGraphic } from "../../../datagraphic";
  import { Line, Band } from "../..";
  import { Axis, AxisContainer, AxisTick, AxisLabel } from "../../../guides";
  import Window1D from "./Window1D.svelte";
  import MetricMouseover from "./MetricMouseover.svelte";

  const legendData = Array.from({ length: 20 }).map((_, i) => {
    let y = 0.5 + (Math.random() - 0.5) * 0.05;
    return {
      x: i / 20,
      y,
      yMin: y * 0.7,
      yMax: y * 1.3,
    };
  });

  const inauguration = new Date(2017, 0, 23);

  function autoCoerce(v) {
    let number = +v;
    if (Number.isNaN(number)) {
      let [m, d, y] = v.split("/");
      let date = new Date(+y, +m - 1, +d);
      if (Number.isNaN(date.getTime())) {
        return v;
      }
      return date;
    }
    return number;
  }

  function autoCoerceCSV(data) {
    let cols = Object.keys(data[0]);
    return data.map((di) => {
      const dnew = {};
      cols.forEach((c) => {
        dnew[c] = autoCoerce(di[c]);
      });
      return dnew;
    });
  }

  function sortBy(k) {
    const sort = (a, b) => {
      if (a[k] < b[k]) return -1;
      return 1;
    };
    return (data) => {
      data.sort(sort);
      return data;
    };
  }

  function filterBy(k, v) {
    return (data) => data.filter((di) => di[k] === v);
  }

  function daysSince(d) {
    return Math.floor((d - inauguration) / 1000 / 60 / 60 / 24);
  }

  function oneCircle(cx, cy, r) {
    return `
M ${cx - r}, ${cy}
  a ${r},${r} 0 1,0 ${r * 2},0
  a ${r},${r} 0 1,0 ${-r * 2},0 Z
`;
  }

  function circles(data, x, y, xs, ys, r) {
    return data.map((di) => oneCircle(xs(di[x]), ys(di[y]), r)).join(" ");
  }

  $: approvalRequest = fetch("approval_topline.csv")
    .then((r) => r.text())
    .then(csvParse)
    .then(autoCoerceCSV)
    .then(filterBy("subgroup", "All polls"))
    .then(sortBy("modeldate"));
  let polls = [];
  $: pollsRequest = fetch("trump_polls.csv")
    .then((r) => r.text())
    .then(csvParse)
    .then(autoCoerceCSV)
    .then(sortBy("modeldate"))
    .then((d) => {
      polls = d;
    });
</script>

<header>
  <div>Example 01</div>
  <h1>Approval Poll Model</h1>
  <p>
    This example partially re-implements the Trump approval poll model chart
    from
    <a href="https://projects.fivethirtyeight.com/trump-approval-ratings/">
      FiveThirtyEight
    </a>
    .
  </p>
</header>

{#await approvalRequest then data}
  <DataGraphic
    xType="time"
    yType="linear"
    bottom={40}
    xMin={inauguration}
    yMin={20}
    yMax={80}
    width={1024}
    height={550}
    right={150}
    let:left
    let:right
    let:xScale
    let:yScale>
    <!-- for mouseover text on bottom axis -->
    <filter id="outline-main">
      <feMorphology
        operator="dilate"
        radius="8"
        in="SourceGraphic"
        result="THICKNESS" />
      <feComposite operator="out" in="THICKNESS" in2="SourceGraphic" />
    </filter>
    <Axis
      side="bottom"
      lineStyle="long"
      ticks={[inauguration, ...xScale.ticks(10)]}
      tickColor="var(--cool-gray-100)"
      labelColor="var(--cool-gray-600)" />
    <AxisContainer side="left">
      <g slot="ticks" let:ticks let:closestMargin let:farthestMargin>
        {#each ticks as tick, i (tick)}
          <AxisTick
            length={tick === 80 ? 4 : 12}
            placement={tick}
            color={tick === 50 ? 'var(--cool-gray-600)' : 'var(--cool-gray-150)'} />
          <AxisTick
            placement={tick}
            color="var(--cool-gray-150)"
            tickDirection={-1}
            length={closestMargin - farthestMargin} />
        {/each}
      </g>
      <g slot="labels" let:ticks style="transform: translateX(-8px);">
        {#each ticks as tick, i}
          <g style="transform: translateX({tick === 80 ? '8px' : '0px'});">
            <AxisLabel
              fontSize="12px"
              fontWeight={tick === 50 ? 'bold' : 'normal'}
              color={tick === 50 ? 'var(--cool-gray-900)' : 'var(--cool-gray-450'}
              placement={tick}>
              {tick}{tick === 80 ? '%' : ' '}
            </AxisLabel>
          </g>
        {/each}
      </g>
    </AxisContainer>

    <Band
      {data}
      x="modeldate"
      yMin="approve_lo"
      yMax="approve_hi"
      color="#e3f0e2" />
    <Band
      {data}
      x="modeldate"
      yMin="disapprove_hi"
      yMax="disapprove_lo"
      color="#fdebe0" />

    {#if polls.length}
      <path
        d={circles(polls, 'enddate', 'approve', xScale, yScale, 2.5)}
        fill="#00a22d"
        opacity=".2" />
      <path
        d={circles(polls, 'enddate', 'disapprove', xScale, yScale, 2.5)}
        fill="#ff781d"
        opacity=".2" />
    {/if}
    <line
      x1={left}
      x2={right}
      y1={yScale(50)}
      y2={yScale(50)}
      stroke="var(--cool-gray-600)" />
    <Line
      {data}
      x="modeldate"
      y="approve_estimate"
      size="3"
      color="#00a22d"
      tickColor="var(--cool-gray-100)"
      scaling={false}
      labelColor="var(--cool-gray-600)" />

    <Line
      {data}
      x="modeldate"
      y="disapprove_estimate"
      size="3"
      scaling={false}
      color="#ff781d" />

    <g slot="annotation" let:top let:bottom let:mousePosition>
      <Window1D {data} key="modeldate" defaultValue="latest" let:output>
        <g transform="translate({xScale(output.modeldate)}, 0)">
          <line
            shape-rendering="crispEdges"
            y1={top}
            y2={bottom + 16}
            stroke-dasharray="4,2"
            stroke-width="1"
            stroke="var(--cool-gray-300)" />
          <text
            text-anchor="middle"
            font-size="12"
            style="text-transform: uppercase;"
            y={top}
            dy="-.75em"
            fill="var(--cool-gray-450)">
            day {format(',')(daysSince(output.modeldate))}
          </text>
          <text
            filter="url(#outline-main)"
            text-anchor="middle"
            font-size="10"
            style="text-transform: uppercase;"
            y={bottom + 20}
            font-weight="bold"
            fill="white">
            {timeFormat('%b %d, %Y')(output.modeldate)}
          </text>
          <text
            text-anchor="middle"
            font-size="10"
            style="text-transform: uppercase;"
            y={bottom + 20}
            font-weight="bold"
            fill="var(--cool-gray-600)">
            {timeFormat('%b %d, %Y')(output.modeldate)}
          </text>
        </g>
        <MetricMouseover
          formatValue={(v) => format('.1%')(v / 100)}
          point={[{ x: output.modeldate, y: output.disapprove_estimate, color: '#ff781d', label: 'Disapprove' }, { x: output.modeldate, y: output.approve_estimate, color: '#00a22d', label: 'Approve' }]} />
      </Window1D>
    </g>
  </DataGraphic>
{/await}

<div
  style=" width: 970px; display: grid; grid-template-columns: auto;
  justify-content: start; ">
  <DataGraphic
    width={220}
    height={125}
    xDomain={[0, 1]}
    yDomain={[0, 1]}
    left={60}
    top={0}
    bottom={0}
    right={120}>
    <g slot="background">
      <Band data={legendData} x="x" yMin="yMin" yMax="yMax" />
    </g>
    <g slot="body">
      <Line data={legendData.slice(0, 15)} x="x" y="y" size="3" color="black" />
    </g>
    <g slot="annotation" let:xScale let:yScale let:left let:right>
      <line
        x1={right + 10}
        x2={right + 10}
        y1={yScale(legendData[legendData.length - 1].yMin)}
        y2={yScale(legendData[legendData.length - 1].yMax)}
        stroke="var(--cool-gray-500)" />
      <line
        x1={right + 10}
        x2={right + 5}
        y1={yScale(legendData[legendData.length - 1].yMin)}
        y2={yScale(legendData[legendData.length - 1].yMin)}
        stroke="var(--cool-gray-500)" />
      <line
        x1={right + 10}
        x2={right + 5}
        y1={yScale(legendData[legendData.length - 1].yMax)}
        y2={yScale(legendData[legendData.length - 1].yMax)}
        stroke="var(--cool-gray-500)" />
      <g
        style=" text-transform: uppercase; fill: var(--cool-gray-650);
        font-size: 10px; ">
        <g
          style="transform: translate({right + 16}px, {yScale(legendData[legendData.length - 1].y) - 10}px);">
          <text>90% of polls</text>
          <text y={13}>projected to fall</text>
          <text y={26}>in this range</text>
        </g>
        <g
          style=" transform: translate({left - 8}px, {yScale(legendData[0].y) - 0}px);
          text-anchor: end; ">
          <text dy=".35em">estimate</text>
        </g>
      </g>
    </g>
  </DataGraphic>
</div>
