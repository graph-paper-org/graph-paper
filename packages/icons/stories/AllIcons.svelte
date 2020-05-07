<script>
  import * as icons from "..";

  export let size = 24;
  export let color = "#000";
</script>

<style>
  .icon-set {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    grid-column-gap: var(--space-2x);
    grid-row-gap: var(--space-base);
    padding-right: var(--space-2x);
  }

  .icon--component {
    display: grid;
    align-items: center;
    justify-items: center;
  }
</style>

<div style="column-count: 3;">
  <div class="icon-set">
    {#each Object.entries(icons) as [name, icon], i}
      <div style="color: {color};" class="icon--component">
        <svelte:component this={icon} {size} />
      </div>
      <div class="icon--name">{name}</div>
    {/each}
  </div>
</div>
