<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { elasticOut as easing } from "svelte/easing";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  import DataGraphic from "../DataGraphic.svelte";
  import LeftAxis from "../../guides/LeftAxis.svelte";
  import BottomAxis from "../../guides/BottomAxis.svelte";
  import Line from "../../elements/Line.svelte";

  export let points = 100;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";

  let y = 100;

  const data = Array.from({ length: points }).map((_, x) => {
    y += (Math.random() - 0.5) * 80;
    return { x, y };
  });
  const params = () => ({
    duration: 200 + Math.random() * 300,
    easing,
  });
  let left = tweened(20, params());
  let right = tweened(20, params());
  let top = tweened(20, params());
  let bottom = tweened(20, params());
  let which = [true, true, true, true];
  setInterval(() => {
    which = [
      Math.random() > 0.5,
      Math.random() > 0.5,
      Math.random() > 0.5,
      Math.random() > 0.5,
    ];
    left.set(which[0] ? 60 : 20);
    right.set(which[1] ? 60 : 20);
    top.set(which[2] ? 60 : 20);
    bottom.set(which[3] ? 60 : 20);
  }, 500);
</script>

<p>The margins of a graph (left, right, top, bottom) should be reactive.</p>
<DataGraphic
  width={500}
  height={300}
  left={$left}
  right={$right}
  top={$top}
  bottom={$bottom}>
  <LeftAxis />
  <BottomAxis />
  <Line {curve} {data} {size} {dashArray} />
</DataGraphic>
