<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { createEventDispatcher, setContext } from "svelte";
  import { CaretDown } from "@graph-paper/icons";
  import { FloatingMenu, MenuList } from "@graph-paper/menu";
  import { onClickOutside } from "@graph-paper/core/utils";
  import { tooltip as tooltipAction } from "@graph-paper/core/actions/tooltip";
  import { createOptionStore } from "./stores";

  export let title;
  export let multi = false;
  export let compact = false;
  export let alignment = "center";
  export let location = "bottom";
  export let active = true;
  export let open;
  export let description;
  export let descriptionLocation = "bottom";
  export let showTooltip = true;

  const enabledOptions = createOptionStore();
  const selectedOptions = createOptionStore();

  let buttonParent;
  let button;
  let width;

  setContext("gp:optionmenu:multi", multi);
  setContext("gp:optionmenu:compact", compact);
  setContext("gp:optionmenu:enabledOptions", enabledOptions);
  setContext("gp:optionmenu:selectedOptions", selectedOptions);

  function toggle() {
    open = !open;
    if (open)
      onClickOutside(
        () => {
          open = false;
        },
        button,
        buttonParent
      );
  }

  let titleElement;

  function handleKeydown({ key }) {
    if (key === "Escape") {
      open = false;
    }
  }

  const dispatch = createEventDispatcher();

  function handleSelection({ detail: { key } }) {
    if (multi) {
      let keys = $selectedOptions.map((so) => so.key);

      if (keys.includes(key)) {
        keys = keys.filter((k) => k !== key);
      } else if (enabledOptions.has(key)) {
        keys.push(key);
      }

      dispatch("selection", { keys });
    } else if (enabledOptions.has(key)) {
      dispatch("selection", { key });
    }
  }

  /**
   * Return an array containing all numbers between two numbers, inclusive.
   *
   * @param {number} x - The first number, inclusive
   * @param {number} y - The second number, inclusive
   * @return {number[]} An array of numbers from x to y, inclusive
   *
   * @example
   * range(1, 3); // returns [1, 2, 3]
   */
  function range(x, y) {
    if (x === y) {
      return [x];
    }
    return [x, ...range(x + 1, y)];
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="option-menu" bind:this={buttonParent}>
  {#if title}
    <div bind:this={titleElement} class="option-menu__title overline-text--01">
      {title}
    </div>
  {/if}
  <button
    bind:this={button}
    class="option-menu__button"
    on:click={toggle}
    class:option-menu__button--active={open}
    disabled={!active}
    use:tooltipAction={{ visible: showTooltip && !open, text: description, location: descriptionLocation }}>
    <div class="option-menu__status-text">
      {#if multi}
        <!-- Make the button at least as wide as the widest option label -->
        {#each range(0, $enabledOptions.length + 1) as i}
          <div
            style="visibility: {$selectedOptions.length === i ? 'visible' : 'hidden'};
            height: {$selectedOptions.length === i ? 'inherit' : 0}; ">
            {i} / {$enabledOptions.length} selected
          </div>
        {/each}
      {:else}
        {#each $enabledOptions as opt, i}
          <div
            style="visibility: {opt.key === $selectedOptions[0].key ? 'visible' : 'hidden'};
            height: {opt.key === $selectedOptions[0].key ? 'inherit' : 0}; ">
            {opt.label}
          </div>
        {/each}
      {/if}
    </div>
    <div
      class="option-menu__down-caret"
      class:option-menu__down-caret--active={open}>
      <CaretDown size="16" />
    </div>
  </button>
</div>

<!-- Always render the Option component(s) being passed in the slot, even if
     they are hidden. We need them to populate the stores based on the labels of
     the options, which they will only do when rendered. If the Option component
     wants to do something when it appears or disappears, it can react to the
     "hidden" prop. -->
<FloatingMenu
  bind:width
  offset={1}
  {location}
  {alignment}
  parent={button}
  hidden={!open}>
  <MenuList on:selection={handleSelection}>
    <slot />
  </MenuList>
</FloatingMenu>
