<script>
import { randomNormal } from 'd3-random';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fly } from 'svelte/transition';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cubicOut as easing, elasticOut as flyEasing } from 'svelte/easing';
import { interpolateMagma as interp } from 'd3-scale-chromatic';
import DataGraphic from '../../../DataGraphic/DataGraphic.svelte';
import LeftAxis from '../../../guides/LeftAxis.svelte';
import BottomAxis from '../../../guides/BottomAxis.svelte';
import Point from '../../Point.svelte';
import { Button } from '../../../Button';

export let size = 3;
export let colorAlpha = 1;
export let stroke = 'transparent';
export let strokeAlpha = 1;
export let strokeWidth = 1;

let index = 0;

const pointCloud = (length = 50) => {
  const xr = randomNormal(Math.random() * 100, 1 + Math.random() * 10);
  const yr = randomNormal(Math.random() * 100, 1 + Math.random() * 10);
  const color = interp(Math.random());
  index += 1;
  return { index, color, data: Array.from({ length }).map(() => ({ x: xr(), y: yr() })) };
};

let datasets = [];

function addDataset() {
  datasets.push(pointCloud());
  datasets = datasets;
}

const N = 10;
const duration = 500;

setInterval(() => {
  addDataset();
  if (datasets.length > N) {
    datasets = datasets.slice(1);
  }
}, duration);

</script>

  <h2>{'<Point />'} – Adding a point cloud iteratively</h2>

  <Button compact level=medium on:click={() => {
    datasets = [];
  }}>remove all point clouds</Button>

  <DataGraphic
      xType=linear
      yType=linear
      width={500}
      height={400}
      xDomainTween={{ duration, easing, delay: duration * 0.3 }}
      yDomainTween={{ duration, easing, delay: duration * 0.3 }}
  >
    <LeftAxis />
    <BottomAxis />
    {#each datasets as pt, i (pt.index)}
    <g in:fly={{
      duration,
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 50,
      easing: flyEasing,
}}>
      <Point
        data={pt.data}
        x={'x'}
        y={'y'}
        size={size}
        alpha={0.7}
        color={pt.color}
        {colorAlpha}
        {stroke}
        {strokeWidth}
        {strokeAlpha} />
      </g>
    {/each}
  </DataGraphic>
