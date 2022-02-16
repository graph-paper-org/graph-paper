<script>
  import { DataGraphic } from "../../datagraphic";
  import { Line } from "../../elements";
  import { Axis } from "..";

  let v = 50;
  const data = Array.from({ length: 100 }).map((_, i) => {
    v += (Math.random() - 0.5) * 4;
    return { x: i, y: v };
  });

  let allColors;

  let leftAxis = true;
  let rightAxis = false;
  let topAxis = false;
  let bottomAxis = true;

  let xAxisTickColor;
  let xAxisLineColor;
  let xAxisLabelColor;
  let xAxisDashArray;
  let xAxisLabelSize = "10px";
  let xAxisShowTicks = true;
  let xAxisShowLabels = true;
  let xAxisShowLine = false;

  let yAxisTickColor;
  let yAxisLineColor;
  let yAxisLabelColor;
  let yAxisLabelSize = "10px";
  let yAxisDashArray = "";
  let yAxisShowTicks = true;
  let yAxisShowLabels = true;
  let yAxisShowLine = false;

  $: xAxisTickColor = allColors;
  $: xAxisLabelColor = allColors;
  $: xAxisLineColor = allColors;
  $: yAxisTickColor = allColors;
  $: yAxisLabelColor = allColors;
  $: yAxisLineColor = allColors;
</script>

<div class="option-set">
  <div class="opt-label">Show</div>
  <div class="options sides">
    <input type="checkbox" bind:checked={leftAxis} />
    left
    <input type="checkbox" bind:checked={rightAxis} />
    right
    <input type="checkbox" bind:checked={topAxis} />
    top
    <input type="checkbox" bind:checked={bottomAxis} />
    bottom
  </div>

  <div class="opt-label">Options</div>
  <div class="options">
    <div>x</div>
    <div>y</div>
    <div />
    <input type="color" bind:value={allColors} />
    <div />
    <div>all colors</div>
    <input type="color" bind:value={xAxisTickColor} />
    <input type="color" bind:value={yAxisTickColor} />
    tickColor
    <input type="color" bind:value={xAxisLineColor} />
    <input type="color" bind:value={yAxisLineColor} />
    lineColor
    <input type="color" bind:value={xAxisLabelColor} />
    <input type="color" bind:value={yAxisLabelColor} />
    labelColor
    <input type="text" bind:value={xAxisLabelSize} />
    <input type="text" bind:value={yAxisLabelSize} />
    labelSize
    <!-- <input type="checkbox" bind:checked={xAxisShowTicks} />
    <input type="checkbox" bind:checked={yAxisShowTicks} />
    showTicks
    <input type="checkbox" bind:checked={xAxisShowLabels} />
    <input type="checkbox" bind:checked={yAxisShowLabels} />
    showLabels
    <input type="checkbox" bind:checked={xAxisShowLine} />
    <input type="checkbox" bind:checked={yAxisShowLine} />
    ShowLine -->
    <!-- <input type="text" bind:value={xAxisDashArray} />
    <input type="text" bind:value={yAxisDashArray} />
    dashArray -->
  </div>
</div>

<DataGraphic
  left={40}
  right={40}
  top={40}
  bottom={40}
  yMin={0}
  yMax={100}
  width={400}
  height={300}
>
  {#if leftAxis}
    <Axis
      side="left"
      tickColor={yAxisTickColor}
      lineColor={yAxisLineColor}
      labelColor={yAxisLabelColor}
      tickDashArray={yAxisDashArray}
      showLabels={yAxisShowLabels}
      showTicks={yAxisShowTicks}
      fontSize={yAxisLabelSize}
      showLine={yAxisShowLine}
    />
  {/if}
  {#if rightAxis}
    <Axis
      side="right"
      tickColor={yAxisTickColor}
      lineColor={yAxisLineColor}
      labelColor={yAxisLabelColor}
      tickDashArray={yAxisDashArray}
      showLabels={yAxisShowLabels}
      showTicks={yAxisShowTicks}
      fontSize={yAxisLabelSize}
      lineStyle="short"
      showLine={false}
    />
  {/if}
  {#if bottomAxis}
    <Axis
      side="bottom"
      tickColor={xAxisTickColor}
      lineColor={xAxisLineColor}
      labelColor={xAxisLabelColor}
      fontSize={xAxisLabelSize}
      tickDashArray={xAxisDashArray}
      showLabels={xAxisShowLabels}
      showTicks={xAxisShowTicks}
      showLine={xAxisShowLine}
    />
  {/if}
  {#if topAxis}
    <Axis
      side="top"
      tickColor={xAxisTickColor}
      lineColor={xAxisLineColor}
      labelColor={xAxisLabelColor}
      fontSize={xAxisLabelSize}
      tickDashArray={xAxisDashArray}
      showLabels={xAxisShowLabels}
      showTicks={xAxisShowTicks}
      showLine={false}
    />
  {/if}
  <Line {data} />
</DataGraphic>

<style>
  .option-set {
    position: absolute;
    left: 0;
    top: 0;
    background-color: white;
    padding: var(--space-3x);
    border-bottom-right-radius: var(--space-base);
    box-shadow: var(--depth-tiny);
  }

  .options {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    grid-column-gap: var(--space-2x);
    grid-row-gap: var(--space-base);
  }

  .options input[type="color"] {
    border: none;
    width: 25px;
  }

  input[type="checkbox"] {
    padding: 0;
    margin: 0;
  }

  .options input[type="text"] {
    width: 40px;
    font-size: var(--text-015);
    text-align: right;
  }

  .sides {
    display: grid;
    grid-template-columns: max-content max-content max-content max-content;
    align-items: center;
    justify-items: center;
  }

  .opt-label {
    padding-top: var(--space-3x);
    padding-bottom: var(--space-base);
    text-transform: uppercase;
    font-weight: semibold;
    color: var(--cool-gray-650);
    font-size: var(--text-015);
  }
</style>
