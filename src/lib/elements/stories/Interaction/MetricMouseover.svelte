<script>
  import { DataGraphic } from "../../../datagraphic";
  import { HorizontalWindow, MetricMouseover, Line } from "../..";

  export let points = 100;
  let y = 100;
  const data = Array.from({ length: points }).map((_, x) => {
    y += (Math.random() - 0.5) * 80;
    return { x, y };
  });

  $: datasets = [
    {
      data,
      x: "x",
      y: "y",
      color: "var(--digital-blue-500)",
      label: "value",
    },
  ];
</script>

<DataGraphic>
  <Line {data} />

  <g slot="annotation" let:mousePosition>
    <HorizontalWindow {datasets} value={mousePosition.x} let:output>
      <MetricMouseover point={output} />
    </HorizontalWindow>
  </g>
</DataGraphic>
