<script>
  import { setContext } from "svelte";
  import { fly } from "svelte/transition";
  import { placeElement } from "../../../../../core/utils/float-placement";

  export let parent;
  export let element;
  export let active = false;
  let leftPlacement = 0;
  let topPlacement = 0;
  export let location = "right";
  export let alignment = "top";
  let scrollY;

  setContext("gp:list:border-radius", "var(--space-1x)");

  $: if (element && parent) {
    [leftPlacement, topPlacement] = placeElement({
      location,
      alignment,
      elementPosition: element.getBoundingClientRect(),
      parentPosition: parent.getBoundingClientRect(),
      distance: 20,
      y: scrollY,
    });
  }
</script>

<style>
  div {
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
    border-radius: var(--space-2x);
    transition: opacity 75ms, transform 75ms;
    opacity: 1;
    z-index: 1;
    transform: none;
  }

  .hidden {
    opacity: 0;
    z-index: -1;
    transform: translateX(-5px);
  }
</style>

<div
  bind:this={element}
  class:hidden={!active}
  style=" position: absolute; left: {leftPlacement}px; top: {topPlacement}px;">
  <slot />
</div>
