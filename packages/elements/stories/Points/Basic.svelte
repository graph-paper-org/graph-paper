<script>
  import { randomNormal } from "d3-random";
  import DataGraphic from "../../../datagraphic/DataGraphic.svelte";
  import LeftAxis from "../../../guides/LeftAxis.svelte";
  import BottomAxis from "../../../guides/BottomAxis.svelte";
  import { Point } from "../..";

  const r = randomNormal(50, 20);
  const data = Array.from({ length: 100 }).map(() => ({ x: r(), y: r() }));
</script>

<DataGraphic width={500} height={400}>
  <LeftAxis />
  <BottomAxis />
  <Point {data} />
</DataGraphic>
