<script>
  import { randomNormal } from 'd3-random';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from 'svelte/motion';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fade } from 'svelte/transition';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut as easing } from 'svelte/easing';
  import DataGraphic from '../../../datagraphic/DataGraphic.svelte';
  import LeftAxis from '../../../guides/LeftAxis.svelte';
  import BottomAxis from '../../../guides/BottomAxis.svelte';
  import Point from '../../Point.svelte';
  import { Button } from '../../../button';

  const rnorm01 = randomNormal(0, 10);
  const rnorm02 = randomNormal(100, 30);
  export let size = 3;
  export let colorAlpha = 1;
  export let stroke = 'transparent';
  export let strokeAlpha = 1;
  export let strokeWidth = 1;

  let index = 0;
  const pt = () => {
    index += 1;
    const which = Math.random() > 0.5;
    const r = which ? rnorm01 : rnorm02;
    const color = which ? 'var(--pantone-red-500)' : 'var(--digital-blue-500)';
    return {
      x: r(),
      y: r(),
      size: size + Math.random() * 2,
      index,
      color,
    };
  };
  function times(fcn, length) {
    return Array.from({ length }).map(fcn);
  }
  let addedPoints = [];

  const INIT = 5;

  function addPoint() {
    addedPoints.push(pt());
    addedPoints = addedPoints;
  }

  times(addPoint, INIT);

  const N = 1000;
  const duration = 400;

  setInterval(() => {
    const t = 50;
    times(addPoint, t);
    if (addedPoints.length > N) {
      addedPoints = addedPoints.slice(Math.abs(addedPoints.length - N));
    }
  }, duration);

  let points = tweened(addedPoints.length, { duration });
  $: $points = addedPoints.length;

</script>

  <h2>{'<Point />'} – adding individual points iteratively</h2>
  <div>
    all points on the graph: {Math.floor($points)}
  </div>


  <Button compact level=medium on:click={() => {
    addedPoints = [];
  }}>remove all points</Button>

  <DataGraphic
      xType=linear
      yType=linear
      width={500}
      height={400}
      xDomainTween={{ duration, easing }}
      yDomainTween={{ duration, easing }}
  >
    <LeftAxis />
    <BottomAxis />
    <g slot=body>
    {#each addedPoints as pt, i (pt.index)}
    <g transition:fade>
      <Point
        x={pt.x}
        y={pt.y}
        size={pt.size}
        alpha={0.2}
        color={pt.color}
        {colorAlpha}
        {stroke}
        {strokeWidth}
        {strokeAlpha} />
      </g>
    {/each}
    </g>
  </DataGraphic>
