<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut as easing } from "svelte/easing";
  import { DataGraphic } from "../../../datagraphic";
  import { LeftAxis, BottomAxis } from "../../../guides";
  import { Button } from "../../../button";
  import { Line } from "../..";

  let W = 600;
  let H = 300;
  let T = 200;
  const C = 25;

  const sizes = tweened(
    Array.from({ length: C }).map(() => [150, 100]),
    { duration: T, easing }
  );

  let size = true;

  const makeData = (_, i) => {
    let v = 100;
    return {
      key: i,
      data: Array.from({ length: 100 }).map((__, ii) => {
        v += (Math.random() - 0.5) * 5;
        return { x: ii, y: v };
      }),
    };
  };

  const datasets = Array.from({ length: C }).map(makeData);
  let current = datasets;
</script>

<Button
  compact
  level="medium"
  on:click={() => {
    size = !size;
    sizes.update((s) => {
      const nextSizes = s.map((_, i) => {
        if (i === 0 && size) return [W, H];
        if (i !== 0 && size) return [0, 0];
        return [150, 100];
      });
      return nextSizes;
    });
  }}
>
  click
</Button>

<div class="graphs">
  {#each current as d, i (d.key)}
    <div>
      <!-- <h4>Group {i + 1}</h4> -->
      <DataGraphic
        width={$sizes[i][0]}
        height={$sizes[i][1]}
        right={2}
        top={10}
      >
        <Line data={d.data} />
        <LeftAxis ticks={[100]} />
        <BottomAxis />
      </DataGraphic>
    </div>
  {/each}
</div>

<style>
  .graphs {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    width: 900px;
    height: 800px;
    gap: var(--space-2x) var(--space-2x);
  }
</style>
