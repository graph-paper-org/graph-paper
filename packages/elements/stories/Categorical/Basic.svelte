<script>
import { tweened } from 'svelte/motion';
import { cubicOut as easing } from 'svelte/easing';
import { randomNormal } from 'd3-random'
import { DataGraphic } from '../../../datagraphic';
import { Axis } from '../../../guides';
import { Bar } from '../../../elements'

const LENGTH = 6;

let r = randomNormal(0, 1);

let width = 300;
let height = 200;
let tickColor = 'var(--cool-gray-200)'

let domain = Array.from({length: LENGTH}).map((_, i) => i)

const makeData = (length = LENGTH) => {
  return Array.from({length}).map((_, i) => {
    let xMax = 30 + (Math.random() * 70);
    let xMin = xMax / 2;
    let median = (xMax + xMin) / 2 + r();
    let x75 = (xMax + median) / 2 + r();
    let x25 = (xMin + median) / 2 + r();
    return {y: i, median, xMin, xMax, x25, x75}
  })
}

let values = tweened(makeData(), {duration: 500, easing});

setInterval(() => {
  $values = makeData();
}, 1000);

let innerY = .5;
let outerY = .5;
let size = 1;

</script>

<style>
.categorical-grid {
  display: grid;
  grid-template-columns: max-content max-content max-content max-content;
  grid-column-gap: var(--space-2x);
  grid-row-gap: var(--space-2x);
}
</style>

<div>
  <code>yInnerPadding</code>
  <input type=range bind:value={innerY} min=0 max=1 step=.01 />
</div>

<div>
  <code>yOuterPadding</code>
  <input type=range bind:value={outerY} min=0 max=1 step=.01 />
</div>

<div>
  <code>size</code>
  <input type=range bind:value={size} min=0 max=1 step=.01 />
</div>

<div class=categorical-grid>

<DataGraphic
  {width}
  {height}
  xType=linear
  yType=scaleBand
  yDomain={domain}
  xDomain={[0, 100]}
  yInnerPadding={innerY}
  yOuterPadding={outerY}
>
  <g slot=background>
    <Axis {tickColor} side=left lineStyle=short />
    <Axis {tickColor} side=bottom lineStyle=long />
  </g>
  <g slot=body let:xScale let:yScale>
      <Bar
        scaling={true}
        data={$values}
        x=xMax y=y {size}
      />
    {#each $values as {xMax, y}}, i (y)}

    {/each}
  </g>
</DataGraphic>

<DataGraphic
  {width}
  {height}
  xType=scaleBand
  yType=linear
  xDomain={domain}
  yDomain={[0, 100]}
  xInnerPadding={innerY}
  xOuterPadding={outerY}
>
  <g slot=background>
    <Axis {tickColor} side=left lineStyle=long />
    <Axis {tickColor} side=bottom lineStyle=short />
  </g>
  <g slot=body let:xScale let:yScale>
    {#each $values as {xMax, y}}, i (y)}
      <Bar x={y} y={xMax} {size} />
    {/each}
  </g>
</DataGraphic>





<DataGraphic
  {width}
  {height}
  xType=linear
  yType=scaleBand
  yDomain={domain}
  xDomain={[0, 100]}
  yInnerPadding={innerY}
  yOuterPadding={outerY}
>
  <g slot=background>
    <Axis {tickColor} side=left lineStyle=short />
    <Axis {tickColor} side=bottom lineStyle=long />
  </g>
  <g slot=body let:xScale let:yScale>
    {#each $values as {xMin, xMax, y}}, i (y)}
      <line
        shape-rendering=crispEdges
        x1={xScale(xMin)}
        x2={xScale(xMax)}
        y1={yScale(y) + yScale.bandwidth() / 2}
        y2={yScale(y) + yScale.bandwidth() / 2}
        stroke=var(--digital-blue-400)
        fill=var(--digital-blue-400) />
      <circle
        cx={xScale(xMin)}
        cy={yScale(y) + yScale.bandwidth() / 2}
        r=2
        stroke=var(--digital-blue-400)
        fill=white
      />
      <circle
        cx={xScale(xMax)}
        cy={yScale(y) + yScale.bandwidth() / 2}
        r=2
        stroke=var(--digital-blue-400)
        fill=var(--digital-blue-400)
      />
    {/each}
  </g>
</DataGraphic>





<DataGraphic
  {width}
  {height}
  yType=linear
  xType=scaleBand
  xDomain={domain}
  yDomain={[0, 100]}
  xInnerPadding={innerY}
  xOuterPadding={outerY}
>
  <g slot=background>
    <Axis {tickColor} side=left lineStyle=long />
    <Axis {tickColor} side=bottom lineStyle=short />
  </g>
  <g slot=body let:xScale let:yScale>
    {#each $values as {xMin, xMax, y}}, i (y)}
      <line
        shape-rendering=crispEdges
        y1={yScale(xMin)}
        y2={yScale(xMax)}
        x1={xScale(y) + xScale.bandwidth() / 2}
        x2={xScale(y) + xScale.bandwidth() / 2}
        stroke=var(--digital-blue-400)
        fill=var(--digital-blue-400) />
      <circle
        cy={yScale(xMin)}
        cx={xScale(y) + xScale.bandwidth() / 2}
        r=2
        stroke=var(--digital-blue-400)
        fill=white
      />
      <circle
        cy={yScale(xMax)}
        cx={xScale(y) + xScale.bandwidth() / 2}
        r=2
        stroke=var(--digital-blue-400)
        fill=var(--digital-blue-400)
      />
    {/each}
  </g>
</DataGraphic>





<DataGraphic
  {width}
  {height}
  xType=linear
  yType=scaleBand
  yDomain={domain}
  xDomain={[0, 100]}
  yInnerPadding={innerY}
  yOuterPadding={outerY}
>
  <g slot=background>
    <Axis {tickColor} side=left lineStyle=short />
    <Axis {tickColor} side=bottom lineStyle=long />
  </g>
  <g slot=body let:xScale let:yScale>
    {#each $values as {xMin, xMax, median, x25, x75, y}}, i (y)}
      <line
        shape-rendering=crispEdges
        x1={xScale(xMin)}
        x2={xScale(xMax)}
        y1={yScale(y) + yScale.bandwidth() / 2}
        y2={yScale(y) + yScale.bandwidth() / 2}
        stroke=var(--digital-blue-400)
        fill=var(--digital-blue-400) />

      <Bar
        x={x25}
        y={y}
        xStart={x75}
        color=white
        outline=var(--digital-blue-400)
        {size}
      />

      <line
        shape-rendering=crispEdges
        x1={xScale(median)}
        x2={xScale(median)}
        y1={yScale(y)}
        y2={yScale(y) + yScale.bandwidth()}
        stroke=var(--digital-blue-400)
      />
    {/each}
  </g>
</DataGraphic>









<DataGraphic
  {width}
  {height}
  yType=linear
  xType=scaleBand
  xDomain={domain}
  yDomain={[0, 100]}
  xInnerPadding={innerY}
  xOuterPadding={outerY}

>
  <g slot=background>
    <Axis {tickColor} side=left lineStyle=long />
    <Axis {tickColor} side=bottom lineStyle=short />
  </g>
  <g slot=body let:xScale let:yScale>
    {#each $values as {xMin, xMax, median, x25, x75, y}}, i (y)}
      <line
        shape-rendering=crispEdges
        y1={yScale(xMin)}
        y2={yScale(xMax)}
        x1={xScale(y) + xScale.bandwidth() / 2}
        x2={xScale(y) + xScale.bandwidth() / 2}
        stroke=var(--digital-blue-400)
        fill=var(--digital-blue-400) />

      <Bar
        y={x75}
        x={y}
        yStart={x25}
        color=white
        outline=var(--digital-blue-400)
        {size}
      />

      <line
        shape-rendering=crispEdges
        y1={yScale(median)}
        y2={yScale(median)}
        x1={xScale(y)}
        x2={xScale(y) + xScale.bandwidth()}
        stroke=var(--digital-blue-400)
      />
    {/each}
  </g>
</DataGraphic>


</div>
