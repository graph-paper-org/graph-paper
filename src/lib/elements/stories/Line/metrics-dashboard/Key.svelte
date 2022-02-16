<script>
  import { DataGraphic } from "../../../../datagraphic";
  import { Line, Band, Point } from "../../..";

  const legendData = Array.from({ length: 20 }).map((_, i) => {
    let y = 0.5 + (Math.random() - 0.5) * 0.05;
    return {
      x: i / 20,
      y,
      yMin: y * 0.7,
      yMax: y * 1.3,
    };
  });
</script>

<DataGraphic
  width={220}
  height={150}
  xDomain={[0, 1]}
  yDomain={[0, 1]}
  left={60}
  top={0}
  bottom={0}
  right={120}
>
  <Band data={legendData} x="x" yMin="yMin" yMax="yMax" />
  <Line data={legendData} x="x" y="y" />

  <g slot="annotation" let:xScale let:yScale let:left let:right>
    <line
      x1={right + 10}
      x2={right + 10}
      y1={yScale(legendData[legendData.length - 1].yMin)}
      y2={yScale(legendData[legendData.length - 1].yMax)}
      stroke="var(--cool-gray-500)"
    />
    <line
      x1={right + 10}
      x2={right + 5}
      y1={yScale(legendData[legendData.length - 1].yMin)}
      y2={yScale(legendData[legendData.length - 1].yMin)}
      stroke="var(--cool-gray-500)"
    />
    <line
      x1={right + 10}
      x2={right + 5}
      y1={yScale(legendData[legendData.length - 1].yMax)}
      y2={yScale(legendData[legendData.length - 1].yMax)}
      stroke="var(--cool-gray-500)"
    />
    <Point
      x={legendData[0].x}
      y={legendData[0].y}
      color="var(--digital-blue-500)"
    />
    <g
      style=" text-transform: uppercase; fill: var(--cool-gray-500); font-size:
      10px; "
    >
      <g
        style="transform: translate({right + 16}px, {yScale(
          legendData[legendData.length - 1].y
        ) - 10}px);"
      >
        <text>95% confidence</text>
        <text y={13}>interval for</text>
        <text y={26}>point estimate</text>
      </g>
      <g
        style=" transform: translate({left - 8}px, {yScale(legendData[0].y) -
          0}px);
        text-anchor: end; "
      >
        <text>point</text>
        <text y="13">estimate</text>
      </g>
    </g>
  </g>
</DataGraphic>
