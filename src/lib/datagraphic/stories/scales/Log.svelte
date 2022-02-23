<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { format } from "d3-format";
  import { DataGraphic } from "../..";
  import { Axis } from "../../../guides";

  const width = 500;
  const height = 300;

  const fmt = format(",.5");
  const axisFormat = format(",");
</script>

<div style="max-width: 600px;">
  <div>
    <h1>log scale</h1>
    <p>
      The log scale behaves similar to the linear scale. Under the hood, it
      leverages d3's
      <code>scaleSymlog</code>
      function. Mouse over the graphic below to see it in action.
    </p>
    <DataGraphic
      xType="log"
      yType="log"
      {width}
      {height}
      bottom={30}
      xDomain={[0, 10000]}
      yDomain={[0, 100000]}
    >
      <g slot="background">
        <Axis side="left" tickFormatter={axisFormat} />
        <Axis side="bottom" tickFormatter={axisFormat} />
      </g>
      <g
        slot="annotation"
        let:left
        let:right
        let:top
        let:bottom
        let:mousePosition
        let:xScale
        let:yScale
      >
        {#if mousePosition.body}
          <g transform="translate({xScale(mousePosition.x)} 0)">
            <line
              shape-rendering="crispEdges"
              y1={top}
              y2={bottom}
              stroke="var(--cool-gray-500)"
            />
            <g transform="translate(0 {yScale(mousePosition.y)})">
              <circle cx="0" cy="0" r="3" fill="black" />
            </g>
          </g>
          <g transform="translate(0 {yScale(mousePosition.y)})">
            <line
              shape-rendering="crispEdges"
              x1={left}
              x2={right}
              stroke="var(--cool-gray-500)"
            />
          </g>

          <text
            x={left}
            y={top - 12}
            font-size="12"
            fill="var(--cool-gray-500)"
          >
            x: {fmt(mousePosition.x)}
          </text>
          <text
            text-anchor="end"
            x={right}
            y={top - 12}
            font-size="12"
            fill="var(--cool-gray-500)"
          >
            y: {fmt(mousePosition.y)}
          </text>
        {/if}
      </g>
    </DataGraphic>
  </div>
</div>
