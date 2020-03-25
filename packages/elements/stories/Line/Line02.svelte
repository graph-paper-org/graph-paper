<script>
import { cubicOut as easing } from 'svelte/easing';

import { schemeTableau10 as cm } from 'd3-scale-chromatic';

import DataGraphic from 'udgl/data-graphics/DataGraphic.svelte';
import Line from 'udgl/data-graphics/elements/Line.svelte';
import Point from 'udgl/data-graphics/elements/Point.svelte';
import LeftAxis from 'udgl/data-graphics/guides/LeftAxis.svelte';
import BottomAxis from 'udgl/data-graphics/guides/BottomAxis.svelte';
import Marker from 'udgl/data-graphics/guides/Marker.svelte';

import Springable from 'udgl/data-graphics/motion/Springable.svelte';
import Tweenable from 'udgl/data-graphics/motion/Tweenable.svelte';

import { window1D } from 'udgl/data-graphics/utils/window-functions';

function createData(n = 50) {
  let y = 20 + Math.random() * 0.6 * 100;
  let d = new Date('1990-03-01');
  return Array.from({ length: n }).map(() => {
    let x = new Date(+d);
    d.setDate(d.getDate() + 1);
    // d.setHours(d.getHours() + 1);
    let r = (Math.random() - 0.5) * 10;
    y = Math.max(0, Math.min(100, y + r));

    return { y, x };
  });
}

const N = 5;

let data = Array.from({ length: N }).fill(null).map(() => createData());

const xDomain = [data[0][0].x, data[0][data[0].length - 1].x];

const get = (d, value) => window1D({
  value, data: d, key: 'x', domain: xDomain,
});

function getValue(d, v) {
  return d.map((di) => get(di, v.x).current.y);
}

function getXY(d, v) {
  return d.map((di) => get(di, v.x).current);
}

</script>

<style>
.data-graphic-container {
  font-family: var(--main-mono-font);
}
</style>

<div class=story>
  <h1 class=story__title>Multiple lines, custom hover</h1>
  <div class=data-graphic-container>
  <DataGraphic
    xDomain={xDomain}
    yDomain={[0, 100]}
    xType='time'
    yType='linear'
    width={700}
    height={350}
    right={120}
  >
    <LeftAxis />
    
    <BottomAxis />

    {#each data as line, i}
    <Line
      data={line}
      color={cm[i]}
      lineDrawAnimation={{ duration: 1000 }}
     />
    {/each}

    <g slot='mouseover' let:value={value} let:top let:right let:bottom let:width let:xScale let:yScale>

      {#if value.x}
        {#each getValue(data, value) as v, i}
        <Tweenable params={{ duration: 100 }} value={v} let:tweenValue>
          <text 
            x={right} 
            text-anchor=end
            y={top + 12 * (i + 1)}
            font-size=12
          >
            <tspan>
                {Math.round(tweenValue)}
            </tspan> <tspan font-size=20 dx=2 dy=2 fill={cm[i]}>•</tspan> 
          </text>
          <text 
            x={right + 2 } 
            text-anchor=start
            y={top + 12 * (i + 1)}
            font-size=11
            fill={cm[i]}
            >
            {['WI', 'FL', 'TX', 'CA', 'NY'][i]}
          </text>
      </Tweenable>

        {/each}
      {/if}

      {#if value.x}
      <Springable value={get(data[0], value.x)} let:springValue>
          <Marker 
            location={springValue.current.x} 
            lineColor=var(--cool-gray-300)
            lineThickness=2
            dasharray='3,2'
          />
          <text          
            text-anchor=middle
            font-size=12
            fill=var(--cool-gray-400)
            font-weight=bold
            text-transform=uppercase
            x={xScale(springValue.current.x)} 
            y={top - 8}>day {Math.round(springValue.currentIndex)}</text>
      </Springable>

      <Springable
          value={getXY(data, value)} 
          let:springValue={spr} >
            {#each spr as {x,y}, i}
              <Point fill={cm[i]} x={x} y={y} r={3} />
            {/each}
      </Springable>


    {/if}
    </g>
  </DataGraphic>
  </div>
</div>