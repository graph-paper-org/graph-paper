<script>
  import { randomNormal } from 'd3-random';
  import { tweened } from 'svelte/motion';
  import { cubicOut as easing } from 'svelte/easing';
  import DataGraphic from '../../../DataGraphic/DataGraphic.svelte';
  import LeftAxis from '../../../guides/LeftAxis.svelte';
  import BottomAxis from '../../../guides/BottomAxis.svelte';
  import Point from '../../Point.svelte';
  import Button from '../../../Button/Button.svelte';

  const rnorm = () => Math.random();// randomNormal(50, 20);
  export let size = 3;
  export let alpha = 1;
  export let color = 'red';
  export let colorAlpha = 1;
  export let stroke = 'transparent';
  export let strokeAlpha = 1;
  export let strokeWidth = 1;

  // let clickedPoints = spring([], { damping: 0.6, stiffness: 0.1 });
  let addedPoints = [{ x: rnorm(), y: rnorm() }, { x: rnorm(), y: rnorm() }, { x: rnorm(), y: rnorm() }, { x: rnorm(), y: rnorm() }];
  function addPoint() {
    addedPoints.push({ x: rnorm(), y: rnorm() });
    addedPoints = addedPoints;
  }

  setInterval(() => {
    addPoint();
    if (addedPoints.length > 100) {
      addedPoints.shift();
    }
  }, 500);

</script>

  <h2>{'<Point />'} – Points stretch extents reactively</h2>
  <div>
    Click to add points to the graph. {addedPoints.length}
  </div>

  <DataGraphic
      width={500}
      height={400}
      let:xScale
  >
    <g slot="annotation" let:xScale let:yScale>
      <text x=10 y=20 font-size=14 fill=black>{xScale.domain()}</text>
      <text x=10 y=40 font-size=14 fill=black>{xScale.domain()}</text>
    </g>
      <LeftAxis />
      <BottomAxis />
      {#each addedPoints as pt}
        <Point
          x={pt.x}
          y={pt.y}
          size={10}
          {alpha}
          {color}
          {colorAlpha}
          {stroke}
          {strokeWidth}
          {strokeAlpha} />
      {/each}
  </DataGraphic>
