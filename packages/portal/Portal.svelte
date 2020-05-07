<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount, onDestroy } from "svelte";

  let ref;
  let portal;
  let mounted = false;

  onMount(() => {
    portal = document.createElement("div");
    portal.className = "portal";
    document.body.appendChild(portal);
    portal.appendChild(ref);
    mounted = true;
  });

  onDestroy(() => {
    document.body.removeChild(portal);
  });
</script>

<div class="gp-portal" style="display: none">
  <div bind:this={ref}>
    {#if mounted}
      <slot />
    {/if}
  </div>
</div>
