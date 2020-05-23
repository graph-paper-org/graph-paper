<script>
  import { Tiles } from "..";

  export let columns = 3;
  export let space = 1;
  export let justifyItems;
  export let justifyContent;
  export let alignItems;
  export let alignContent;
</script>

<Tiles
  {columns}
  {space}
  {justifyItems}
  {justifyContent}
  {alignItems}
  {alignContent}>
  {#each Array.from({ length: columns * 3 }).fill(null) as _, i}
    <div class="_ _small" style="height: {32 + (i % 2) * 32}px;" />
  {/each}
</Tiles>
