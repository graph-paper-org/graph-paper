<script>
  import DataGraphic from "../../../datagraphic/DataGraphic.svelte";
  import LeftAxis from "../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../guides/BottomAxis.svelte";
  import Line from "../../Line.svelte";

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
</script>

<input
  style="position: absolute; left:0; top:0"
  type="range"
  bind:value={w}
  min="75"
  max="900" />
<input
  style="position: absolute; left:0; top:40px"
  type="range"
  bind:value={h}
  min="75"
  max="900" />

<h3>container size changes</h3>

<div style="width: {w}px; height: {h}px;">
  <DataGraphic height={null}>
    <LeftAxis />
    <BottomAxis />
    <Line {curve} {data} {size} {dashArray} />
  </DataGraphic>
</div>

<h3>graphic size changes</h3>

<div>
  <DataGraphic width={w} height={h}>
    <LeftAxis />
    <BottomAxis />
    <Line {curve} {data} {size} {dashArray} />
  </DataGraphic>
</div>
