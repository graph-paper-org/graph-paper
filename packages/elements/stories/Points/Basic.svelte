<script>
  import { tweened } from 'svelte/motion';
  import { elasticOut as easing } from 'svelte/easing';
  import DataGraphic from '../../../DataGraphic/DataGraphic.svelte';
  import LeftAxis from '../../../guides/LeftAxis.svelte';
  import BottomAxis from '../../../guides/BottomAxis.svelte';
  import Point from '../../Point.svelte';
  import Button from '../../../Button/Button.svelte';

  // let clickedPoints = spring([], { damping: 0.6, stiffness: 0.1 });
  let clickedPoints = [];
  const STARTING_SIZE = 3;
  let size = tweened(STARTING_SIZE, { duration: 400, easing });
  let hoverValue = {};

  function addPoint() {
    if (hoverValue.body) {
      clickedPoints.push({ ...hoverValue, body: 0 });
      clickedPoints = clickedPoints;
    }

    $size = STARTING_SIZE;
  }

  function changeSize() {
    $size = 12;
  }
</script>

  <h2>Single Point</h2>
  <div>
    Click to add points to the graph.
  </div>
  <div>
    Points added: {clickedPoints.length}
  </div>

  <DataGraphic
      xType=linear
      yType=linear
      width={500}
      height={400}
      xDomain={[0, 100]}
      yDomain={[0, 100]}
      bind:hoverValue
      on:click={addPoint}
      on:mousedown={changeSize}
      on:mouseleave={() => { $size = STARTING_SIZE; }}
  >
      <LeftAxis />
      <BottomAxis />
      {#if hoverValue && hoverValue.body}
        <Point x={hoverValue.x} y={hoverValue.y} r={$size} opacity={0.5} />
      {/if}
      {#each clickedPoints as pt}
        <Point x={pt.x} y={pt.y} r={3} />
      {/each}
  </DataGraphic>
