<script>
  export let space = 1;
  export let justifyItems = "stretch";
  export let justifyContent = "stretch";
  export let alignItems = "normal";
  export let alignContent = "start";
</script>

<div
  class="gp-stack"
  style="--space: var(--space-{space}x); --justify-items: {justifyItems};
  --justify-content: {justifyContent}; --align-items: {alignItems};
  --align-content: {alignContent};"
>
  <slot />
</div>
