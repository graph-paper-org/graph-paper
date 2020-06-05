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

<MenuListItem {compact} {key} value={label} hoverable={!disabled}>
  <div class="option-menu__list-item__inner">
    {#if oneOfMultiple}
      <div
        class="option-menu__list-item__checkbox"
        class:option-menu__list-item__checkbox--disabled={disabled}>
        {#if selected}
          <Checkbox size={checkboxSize} />
        {:else}
          <CheckboxBlank size={checkboxSize} />
        {/if}
      </div>
    {/if}

    <div
      class="option-menu__list-item__title"
      class:option-menu__list-item__title--disabled={disabled}>
      {label}
    </div>

    {#if description}
      <div
        class="option-menu__list-item__description"
        class:option-menu__list-item__description--disabled={disabled}>
        {description}
      </div>
    {/if}

    <div class="option-menu__list-item__slot-right-container">
      <slot name="right" />
    </div>
  </div>
</MenuListItem>
