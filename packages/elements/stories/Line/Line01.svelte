<script>
import { onMount } from 'svelte';
import { spring } from 'svelte/motion';
import { derived } from 'svelte/store';
import { format } from 'd3-format';
import { fly } from 'svelte/transition';

import DataGraphic from '../../../DataGraphic/DataGraphic.svelte';
import Line from '../../Line.svelte';
import Point from '../../Point.svelte';

import MarginText from '../../../guides/MarginText.svelte';
import LeftAxis from '../../../guides/LeftAxis.svelte';
import BottomAxis from '../../../guides/BottomAxis.svelte';

import Button from '../../../Button';

const fmt = (v) => (v ? format(',.2f')(v) : '');
const perc = format('.2p');
const M = 6;

function makeLine(m = 3, n = 1) {
  let v = 50;
  return Array.from({ length: 100 }).map((_, i) => {
    const datapoint = { x: i + 1900, y: v };
    v = Math.max(0, Math.min(100, v + (Math.random() - 0.5) * m * n));
    return datapoint;
  });
}

const K = 16;
let lines = Array.from({ length: K })
  .map((_, i) => spring(makeLine(M), { stiffness: 0.3, damping: 0.3 }));

const lineSet = derived(lines, ($lines) => $lines);

let hoverValue = {};

function getY(data, x) {
  const match = data.find((v) => v.x === x);
  if (!match || !x) return undefined;
  return match.y;
}

let mounted = false;

onMount(() => {
  mounted = true;
});

const labels = Array.from({ length: K }).map((_, i) => `Group-${i}`);

</script>

<style>

.story {
  padding-right: var(--space-4x);
  padding-bottom: var(--space-4x);
}

.lines {
  display: grid;
  grid-template-columns: repeat(4, 200px);
  justify-items: start;
  align-items: start;
  grid-column-gap: var(--space-base);
  grid-row-gap: var(--space-4x);
  margin-top: var(--space-4x);
  font-family: var(--main-mono-font);
}

.small-multiple__header {
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: var(--space-2x);
}

.small-multiple__metric {
  font-size: 14px;
  font-weight: 300;
  justify-self: end;
}

.offset-for-graphs {
  padding-left: 48px;
  margin-right: 15px;
}

h3 {
  margin:0;
  /* font-weight: 300; */
  font-size: 14px;
  text-align: center;
}

</style>

<div class=story>

  <h1 class="story__title offset-for-graphs">Lines</h1>

  <div class=offset-for-graphs>
    <Button compact level=medium on:click={() => {
      lines.forEach((line) => {
        line.set(makeLine(M));
      });
    }}>randomize</Button>
  </div>
{#if mounted}
<div class=lines>
  {#each $lineSet as line, i}
  <div class=small-multiple in:fly={{ duration: 500, delay: (i) * 50, x: -5 }}>
    <div class="small-multiple__header offset-for-graphs">
      <h3>{labels[i]}</h3>
      <div class='small-multiple__metric'>{fmt(getY(line, Math.floor(hoverValue.x ? hoverValue.x : line[line.length - 1].x)))}</div>
    </div>
    <DataGraphic
      xDomain={[1900, 2000]}
      yDomain={[0, 100]}
      yType="linear"
      xType="linear"
      width={200}
      height={100}
      data={line}
      top={20}
      bind:hoverValue={hoverValue}
    >
      <LeftAxis ticks={[0, 50, 100]} showLabels={i === 0} />
      <BottomAxis ticks={[1900, 1950, 2000]} />
      <Line
      lineDrawAnimation={{ duration: 1000, delay: i * 45 }}
        data={line} 
        xAccessor=x 
        yAccessor=y />

      <g slot='mouseover' let:value=>
        {#if hoverValue.body}
        <Point 
            x={hoverValue.x} y={getY(line, Math.floor(hoverValue.x))} r={2} />
          />
          <Point 
            x={hoverValue.x} 
            y={getY(line, Math.floor(hoverValue.x))} 
            r={1 + 10 * (getY(line, Math.floor(hoverValue.x)) / 100)} 
            opacity={0.2}
            />
          <MarginText fontSize=11.5 justify=left temporaryLabel={Math.floor(value.x) || ''} />
          <MarginText fontSize=11.5 justify=right temporaryLabel={value.y ? perc(getY(line, Math.floor(hoverValue.x)) / line[0].y - 1) : ''} />
        {/if}
      </g>

    </DataGraphic>
  </div>
  {/each}
</div>
{/if}
</div>