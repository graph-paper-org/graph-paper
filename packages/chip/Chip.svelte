<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { cubicOut } from "svelte/easing";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { createEventDispatcher } from "svelte";
  import { Cancel, Check } from "@graph-paper/icons";

  const dispatch = createEventDispatcher();

  export let key;
  export let disabled = false;
  export let cancelable = false;
  export let filterable = false;
  export let toggled = false;

  export let transitionSpeed = 125;

  // FIXME: consider moving this to core if we can figure out how to make
  // this transition generalized.
  export function fold(
    node,
    {
      delay = 0,
      duration = transitionSpeed,
      easing = cubicOut,
      rightOffset = 0,
      leftOffset = 8,
    }
  ) {
    const style = getComputedStyle(node);
    const width = parseFloat(style.width);
    const opacity = +style.opacity;
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    const marginLeft = parseFloat(style.marginTop);
    const marginRight = parseFloat(style.marginBottom);
    const borderLeftWidth = parseFloat(style.borderLeftWidth);
    const borderRightWidth = parseFloat(style.borderRightWidth);

    return {
      delay,
      duration,
      easing,
      css: (t) => `
        overflow: hidden;
        white-space: nowrap;
        opacity: ${Math.min(t * 20, 1) * opacity};
        width: ${t * width}px;
        padding-right: ${t * paddingRight}px;
        padding-left: ${t * paddingLeft}px;
        margin-left: ${t * marginLeft - (1 - t) * leftOffset}px;
        margin-right: ${t * marginRight - (1 - t) * rightOffset}px;
        border-left-width: ${t * borderLeftWidth}px;
        border-right-width: ${t * borderRightWidth}px;
      `,
    };
  }

  function cancel() {
    dispatch("cancel", key);
  }
</script>

<button
  class:gp-chip--disabled={disabled}
  class:gp-chip--cancelable={cancelable}
  class:gp-chip--toggled={toggled}
  on:click
  class="gp-chip"
  transition:fold|local={{ duration: 200 }}>
  {#if filterable && toggled}
    <div
      in:fold|local={{ duration: transitionSpeed, leftOffset: 0, rightOffset: 0 }}
      out:fold|local={{ duration: transitionSpeed, leftOffset: 0, rightOffset: 0 }}
      class="gp-chip--icon gp-chip--icon--left"
      on:click={cancel}>
      <Check size={14} />
    </div>
  {/if}
  <div class="gp-chip--slot">
    <slot />
  </div>
  {#if cancelable}
    <div class="gp-chip--icon gp-chip--icon--right" on:click={cancel}>
      <Cancel size={14} />
    </div>
  {/if}
</button>
