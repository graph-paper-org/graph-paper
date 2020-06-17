<script>
import { DataGraphic } from '../../../datagraphic';
import { Axis } from '../../../guides';
</script>

<DataGraphic
  xType=linear
  yType=scaleBand
  yDomain={[0,1,2,3,4]}
  xDomain={[0, 100]}
>
  <Axis side=left lineStyle=short />
  <Axis side=bottom lineStyle=long />

  <g slot=body let:xScale let:yScale>
    {#each [52,63,66,91,13] as value, i}
      <rect x={0} y={yScale(i)} width={xScale(value) - xScale(0)} height={yScale.bandwidth()} fill=black />
    {/each}
  </g>
</DataGraphic>
