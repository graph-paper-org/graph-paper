<script>
  export let columns = 3;
  export let space = 1;
  export let columnSize = "auto";
</script>

<div
  class="gp-tiles"
  style="--columns: {columns}; --space: var(--space-{space}x); --column-size: {columnSize};">
  <slot />
</div>
