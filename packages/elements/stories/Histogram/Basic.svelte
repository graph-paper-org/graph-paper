<script>
import { randomNormal } from 'd3-random';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fade } from 'svelte/transition';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cubicOut as easing } from 'svelte/easing';
import DataGraphic from '../../../datagraphic/DataGraphic.svelte';
import LeftAxis from '../../../guides/LeftAxis.svelte';
import BottomAxis from '../../../guides/BottomAxis.svelte';
import Histogram from '../../Histogram.svelte';

export let points = 100;
export let bins = 10;

let i = 0;
let datasets = [];

function getColor(ind) {
  if (ind === 0) return 'var(--digital-blue-400)';
  if (ind === 1) return 'var(--cool-gray-600)';
  if (ind === 2) return 'var(--pantone-red-400)';
  if (ind === 3) return 'var(--bright-yellow-400)';
  if (ind === 4) return 'purple';
  return 'cornflowerblue';
}

function addDataset() {
  const r = Math.random();
  let generate;
  // if (r > 0.5)
  generate = randomNormal(Math.random() * 100, 5);
  datasets.push({
    index: i,
    data: Array.from({ length: points * (r < 0.1 ? 1 : Math.floor(1 + Math.random() * 5)) }).map(() => ({ value: generate() })),
  });
  datasets = datasets;
  i += 1;
}

addDataset();

setInterval(() => {
  addDataset();
  if (datasets.length > 4) {
    datasets.shift();
  }
}, 800);

</script>
<DataGraphic
  xType=linear
  yType=linear
  xDomainTween={{ duration: 700, easing }}
  yDomainTween={{ duration: 700, easing }}>
    <LeftAxis />
    <BottomAxis />
    {#each datasets as {data, index}, i (index)}
      <g>
        <Histogram blend=multiply color={getColor(index % 4)} {bins} data={data} alpha={0.5} tweenParams={{ duration: 500, easing }} />
      </g>
    {/each}
  </DataGraphic>
