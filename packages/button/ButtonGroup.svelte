<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { setContext } from "svelte";

  export let justify = "flex-start";
  export let level;
  export let compact;

  setContext("level", level);
  setContext("compact", compact);
</script>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(10, max-content); */
    grid-row-gap: var(--space-base);
  }

  div :global(button:not(:first-child):not(:last-child)) {
    border-radius: 0px;
  }

  /* FIXME: this should only apply to .gp-button */
  div :global(.gp-button:first-child) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  div :global(.gp-button:last-child) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
</style>

<div class="button-group" style="justify-content: {justify};">
  <slot />
</div>
