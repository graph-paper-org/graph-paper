<script>
  import { Line } from "../../elements";
  import { Chip, ChipSet } from "../../chip";
  import { DataGraphic } from "..";

  let v = 50;
  const data = Array.from({ length: 100 }).map((_, i) => {
    v += Math.random() - 0.5;
    return { x: i, y: v };
  });

  let borders = ["left", "right", "top", "bottom"];
  const setBorder = (side) => () => {
    if (borders.includes(side))
      borders = [...borders.filter((s) => s !== side)];
    else borders = [...borders, side];
  };
</script>

<ChipSet>
  <Chip
    filterable
    toggled={borders.includes("left")}
    on:click={setBorder("left")}>left</Chip
  >
  <Chip
    filterable
    toggled={borders.includes("right")}
    on:click={setBorder("right")}>right</Chip
  >
  <Chip filterable toggled={borders.includes("top")} on:click={setBorder("top")}
    >top</Chip
  >
  <Chip
    filterable
    toggled={borders.includes("bottom")}
    on:click={setBorder("bottom")}>bottom</Chip
  >
</ChipSet>

<div style="border: 2px solid var(--cool-gray-500);">
  <DataGraphic
    width={500}
    height={400}
    leftBorder={borders.includes("left")}
    rightBorder={borders.includes("right")}
    topBorder={borders.includes("top")}
    bottomBorder={borders.includes("bottom")}
  >
    <Line {data} />
  </DataGraphic>
</div>
