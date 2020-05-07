<script>
  import { Tiles } from "..";

  export let columns = 3;
  export let space = 1;
</script>

<Tiles {columns} {space}>
  {#each Array.from({ length: columns * 3 }).fill(null) as _, i}
    <div class="_ _small" />
  {/each}
</Tiles>
