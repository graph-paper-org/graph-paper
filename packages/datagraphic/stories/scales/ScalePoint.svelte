<script>
  import { DataGraphic } from "../..";
  import { Point } from "../../../elements";
  import { BottomAxis, LeftAxis } from "../../../guides";

  const length = 10;
  const data = Array.from({ length }).map((_, i) => {
    let which = Math.floor(Math.random() * length);
    return { x: `${i}-group`, y: which, size: 2 + Math.random() * 6 };
  });
</script>

<div style="max-width: 600px;">
  <h1>scalePoint</h1>

  <p>
    The scalePoint type uses d3-scale's scalePoint. It's possible we will remove
    both scalePoint and scaleBand in favor of a single "categorical" type.
  </p>
  <DataGraphic
    bottom={30}
    width={500}
    height={300}
    xType="scalePoint"
    yType="scalePoint"
    xDomain={data.map((di) => di.x)}
    yDomain={Array.from({ length }).map((_, i) => i)}>
    <BottomAxis lineStyle="long" />
    <LeftAxis lineStyle="long" />
    {#each data as d, ii}
      <Point x={d.x} y={d.y} size={d.size} />
    {/each}

    <g
      slot="background"
      let:mousePosition
      let:xScale
      let:yScale
      let:top
      let:bottom
      let:left
      let:right>
      <text x="5" y="15" fill="black">
        <tspan>{mousePosition.x}</tspan>
        <tspan>{mousePosition.y}</tspan>
      </text>
      {#if mousePosition.x !== undefined && mousePosition.body}
        <line
          x1={xScale(mousePosition.x)}
          x2={xScale(mousePosition.x)}
          y1={top}
          y2={bottom}
          stroke-width="3"
          stroke="var(--cool-gray-300)" />
      {/if}
      {#if mousePosition.y !== undefined && mousePosition.body}
        <line
          y1={yScale(mousePosition.y)}
          y2={yScale(mousePosition.y)}
          x1={left}
          x2={right}
          stroke-width="3"
          stroke="var(--cool-gray-300)" />
      {/if}
    </g>
  </DataGraphic>
</div>
