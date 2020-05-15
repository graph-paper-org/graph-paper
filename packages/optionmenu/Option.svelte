<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext } from "svelte";

  import { MenuListItem } from "@graph-paper/menu";
  import { Checkbox, CheckboxBlank } from "@graph-paper/icons";

  export let description;
  export let disabled = false;
  export let key;
  export let label;
  export let selected = false;

  const oneOfMultiple = getContext("gp:optionmenu:multi") || false;
  const compact = getContext("gp:optionmenu:compact") || false;
  const enabledOptions = getContext("gp:optionmenu:enabledOptions");
  const selectedOptions = getContext("gp:optionmenu:selectedOptions");

  const checkboxSize = 14;

  // Just a little more readable
  const enabled = !disabled;

  // If the enabled status of this option changed, update the enabledOptions
  // store
  $: if (enabled && !enabledOptions.has(key)) {
    enabledOptions.add(key, label);
  } else if (!enabled && enabledOptions.has(key)) {
    enabledOptions.remove(key);
  }

  // If this option is enabled the selected status changed, update the
  // selectedOptions store
  $: if (enabled && selected && !selectedOptions.has(key)) {
    selectedOptions.add(key, label);
  } else if (enabled && !selected && selectedOptions.has(key)) {
    selectedOptions.remove(key);
  }
</script>

<style>
  #menu-list-item-inner {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 30px;
    justify-content: space-between;
  }
</style>

<MenuListItem {compact} {key} value={label} hoverable={!disabled}>
  <div id="menu-list-item-inner">
    <div class="option-menu__list-item__content">
      {#if oneOfMultiple}
        <div
          class="option-menu__list-item__icon"
          class:option-menu__list-item__icon--disabled={disabled}>
          {#if selected}
            <Checkbox size={checkboxSize} />
          {:else}
            <CheckboxBlank size={checkboxSize} />
          {/if}
        </div>
      {/if}

      <div class="option-menu__list-item__text">
        <div
          class="option-menu__list-item__title"
          class:option-menu__list-item__title--disabled={disabled}>
          <div class="menu-list-item__title__label">{label}</div>
        </div>
        {#if description}
          <div
            class="option-menu__list-item__description"
            class:option-menu__list-item__description--disabled={disabled}>
            {description}
          </div>
        {/if}
      </div>
    </div>
    <slot name="right" />
  </div>
</MenuListItem>
