<script>
  export let columns = 3;
  export let space = 1;
  export let columnSize = "auto";
  export let justifyItems = "start";
  export let justifyContent = "start";
  export let alignItems = "normal";
  export let alignContent = "start";
</script>

<div
  class="gp-tiles"
  style=" --columns: {columns}; --space: var(--space-{space}x); --column-size: {columnSize};
  --justify-items: {justifyItems}; --justify-content: {justifyContent};
  --align-items: {alignItems}; --align-content: {alignContent};"
>
  <slot />
</div>
