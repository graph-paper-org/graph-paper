<script>
  import DataGraphic from "../DataGraphic.svelte";
  import LeftAxis from "../../guides/LeftAxis.svelte";
  import BottomAxis from "../../guides/BottomAxis.svelte";
  import Line from "../../elements/Line.svelte";
  import { Tiles } from "../../tiles";

  export let points = 100;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";

  let h = 200;
  let w = 400;
  let y = 100;
  const data = Array.from({ length: points }).map((_, x) => {
    y += (Math.random() - 0.5) * 80;
    return { x, y };
  });

  $: containerChange = `
<div style='width: ${w}px; height: ${h}px;'>
  <DataGraphic>
    ...
  </DataGraphic>
</div>
`;
  $: dataGraphicChange = `
<div>
  <DataGraphic width={${w}} height={${h}}'>
    ...
  </DataGraphic>
</div>
`;
</script>

<div class="controls">
  <input type="range" bind:value={w} min="75" max="600" />
  <input type="range" bind:value={h} min="75" max="400" />
</div>

<div>
  <h1>Width and Height</h1>
  <p>
    The
    <code>width</code>
    and
    <code>height</code>
    of a data graphic will respond reactively to (1) changes to the parent container
    size (if the width and height are not explicitly set) and (2) changes to the
    actual width and height props.
  </p>
  <Tiles columns={2} space={3}>
    <div>
      <h3>container size changes</h3>
      <pre>{containerChange}</pre>
      <div style="width: {w}px; height: {h}px;">
        <DataGraphic height={null}>
          <LeftAxis />
          <BottomAxis />
          <Line {curve} {data} {size} {dashArray} />
        </DataGraphic>
      </div>
    </div>

    <div>
      <h3>graphic size changes</h3>
      <pre>{dataGraphicChange}</pre>
      <div>
        <DataGraphic width={w} height={h}>
          <LeftAxis />
          <BottomAxis />
          <Line {curve} {data} {size} {dashArray} />
        </DataGraphic>
      </div>
    </div>
  </Tiles>
</div>

<style>
  .controls {
    position: absolute;
    left: 0;
    top: 0;
    padding: var(--space-2x);
  }

  input[type="range"] {
    display: block;
  }
</style>
