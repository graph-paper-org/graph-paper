<script>
  import { Stack } from "..";

  export let columns = 3;
  export let space = 1;
  export let justifyItems;
  export let justifyContent;
  export let alignItems;
  export let alignContent;
</script>

<div style="background-color: rgba(255,0,0,.1);">
  <Stack {space} {justifyItems} {justifyContent} {alignItems} {alignContent}>
    {#each Array.from({ length: columns }).fill(null) as _, i}
      <div class="_ " />
    {/each}
  </Stack>
</div>
