<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { setContext } from "svelte";
  import { Portal } from "@graph-paper/portal";
  import { placeElement } from "@graph-paper/core/utils/float-placement";

  export let parent;
  export let offset = 0;
  export let location = "bottom";
  export let alignment = "left";
  export let onParentSelect = () => {};
  export let hidden = false;

  let element;
  let scrollY;

  let innerWidth;
  let innerHeight;

  let leftPlacement;
  let topPlacement;

  setContext("onChildSelect", onParentSelect);

  $: if (element && parent) {
    [leftPlacement, topPlacement] = placeElement({
      location,
      alignment,
      elementPosition: element.getBoundingClientRect(),
      parentPosition: parent.getBoundingClientRect(),
      distance: offset,
      y: scrollY,
    });
  }
</script>

<style>
  .bound-menu {
    position: absolute;
    width: max-content;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .hidden {
    visibility: hidden;
  }
</style>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

<Portal>
  <div
    class="bound-menu"
    class:hidden
    bind:this={element}
    style=" left: {leftPlacement}px; top: {topPlacement}px; max-height:
    calc(100vh - {topPlacement}px - var(--screen-padding)); ">
    <slot />
  </div>
</Portal>
