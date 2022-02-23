<script>
  import DataGraphic from "../../../datagraphic/DataGraphic.svelte";
  import LeftAxis from "../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../guides/BottomAxis.svelte";
  import Line from "../../Line.svelte";

  export let points = 100;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";

  let y = 100;

  const data = Array.from({ length: points }).map((_, x) => {
    y += (Math.random() - 0.5) * 80;
    return { x, y };
  });
</script>

<DataGraphic>
  <LeftAxis />
  <BottomAxis />
  <Line {curve} {data} {size} {dashArray} />
</DataGraphic>
