<script>
import { randomNormal } from 'd3-random';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fade } from 'svelte/transition';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cubicOut as easing } from 'svelte/easing';
import { interpolateSinebow as interp01, interpolateCividis as interp02 } from 'd3-scale-chromatic';
import DataGraphic from '../../../datagraphic/DataGraphic.svelte';
import LeftAxis from '../../../guides/LeftAxis.svelte';
import BottomAxis from '../../../guides/BottomAxis.svelte';
import Line from '../../Line.svelte';

export let points = 100;
export let curve = 'curveMonotoneX';

const makeData = () => {
  let y = randomNormal(0, 100)();
  const rnorm = randomNormal(0, 1 + Math.random() * 50);

  return Array.from({ length: points }).map((_, x) => {
    y += rnorm();
    return { x, y };
  });
};

let datasets = [];
let index = 0;
function add() {
  const interp = Math.random() > 0.5 ? interp01 : interp02;
  datasets.push({
    index,
    data: makeData(),
    color: interp(1 - (0.5 + (Math.random() - 0.5))),
    thickness: 1 + Math.random() * 2,
  });
  datasets = datasets;
  index += 1;
}
const N = 20;

const duration = 250;
setInterval(() => {
  add();
  if (datasets.length > N) {
    datasets = datasets.slice(1);
  }
}, duration);

</script>
<h2>{'<Line />'} – Adding lines iteratively</h2>

<DataGraphic
    width={500}
    height={400}
    xDomain={[0, points]}
    xType=linear
    yType=linear
    xDomainTween={{ duration, easing }}
    yDomainTween={{ duration, easing }}
>
    <LeftAxis />
    <BottomAxis />
    {#each datasets as {data, color, thickness, index}, i (index)}
      <g out:fade>
        <Line color={color} strokeWidth={thickness} lineDrawAnimation={{ duration: duration * 5, easing }} {curve} {data} />
      </g>
    {/each}
</DataGraphic>
