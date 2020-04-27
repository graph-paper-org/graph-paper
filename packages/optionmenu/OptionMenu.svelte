<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount, createEventDispatcher } from 'svelte';

  import { FloatingMenu, MenuList, MenuListItem } from '@graph-paper/menu';
  import { CaretDown, Checkbox, CheckboxBlank } from '@graph-paper/icons';
  import { tooltip as tooltipAction } from '@graph-paper/core/actions/tooltip';


  export let title;
  export let options;
  export let multi = false;
  export let currentOption;
  export let compact = false;
  export let alignment = 'center';
  export let location = 'bottom';
  export let active = true;
  export let open;
  export let description;
  export let descriptionLocation = 'bottom';
  export let showTooltip = true;

  let buttonParent;
  let button;
  let width;

  // https://stackoverflow.com/a/3028037/4297741
  function hideOnClickOutside(element) {
    const outsideClickListener = (event) => {
      if (
        !buttonParent
        || (!element.contains(event.target)
        && !buttonParent.contains(event.target)
        && open)
      ) {
        /* eslint-disable no-use-before-define */
        toggle();
        removeClickListener();
        /* eslint-enable no-use-before-define */
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  }

  function toggle() {
    open = !open;
    hideOnClickOutside(button);
  }

  function keys(opts) {
    return opts.map((o) => o.key);
  }

  function selectable(opts) {
    return opts.filter((o) => o.key !== 'DIVIDER');
  }

  const dispatch = createEventDispatcher();

  function setValue(event) {
    const newValue = event.detail.value;
    if (!newValue.disabled) {
      if (multi) {
        if (keys(currentOption).includes(newValue.key)) {
          currentOption = [...currentOption.filter((o) => o.key !== newValue.key)];
        } else {
          currentOption = [...currentOption, newValue];
        }
      } else {
        currentOption = newValue;
      }
      if (!multi) open = false;
      dispatch('selection', { option: currentOption });
    }
  }

  let titleElement;
  let titleWidth = 0;

  function keyDown({ key }) {
    if (key === 'Escape') {
      open = false;
    }
  }

  onMount(() => {
    if (title) titleWidth = titleElement.getBoundingClientRect().width;
  });

</script>

<svelte:window on:keydown={keyDown} />

<div class="option-menu" bind:this={buttonParent}>
  {#if title}
    <div bind:this={titleElement} class="option-menu__label overline-text--01">{title}</div>
  {/if}
  <button
    bind:this={button}
    class="option-menu__button"
    on:click={toggle}
    style="min-width: calc({titleWidth}px + var(--space-base));"
    class:option-menu__button--active={open}
    disabled={!active}
    use:tooltipAction={ { visible: (showTooltip && !open), text: description, location: descriptionLocation }}
    >
        <div>
          {#if multi}
            {#each Array.from({ length: selectable(options).length }).map((_, index) => index) as i, j}
            <div style="
              visibility: {currentOption.length === i ? "visible" : "hidden"};
              height: {currentOption.length === i ? "inherit" : 0};
            ">{i} / {selectable(options).length - 1} selected</div>
            {/each}
          {:else}
            {#each options as opt, i}
            <div style="
              visibility: {opt.key === currentOption.key ? "visible" : "hidden"};
              height: {opt.key === currentOption.key ? "inherit" : 0};
            ">{opt.label}</div>
            {/each}
          {/if}
        </div>
        <div class="option-menu__down-caret" class:option-menu__down-caret--active={open}>
          <CaretDown size=16 />
        </div>
  </button>
</div>

{#if open}
  <FloatingMenu
    bind:width={width}
    offset={1}
    {location}
    {alignment}
    parent={button}
  >
    <MenuList on:selection={setValue}>
      {#each options as opt, i}
        {#if opt.key === 'DIVIDER'}
          <hr class=option-menu__list-item__divider />
        {:else}
          <MenuListItem {compact} hoverable={opt.disabled !== true} key={opt.key} value={opt}>

          <div class=option-menu__list-item__content>
            {#if multi}
              <div
                class=option-menu__list-item__icon
                class:option-menu__list-item__icon--disabled={opt.disabled === true}
              >
                {#if keys(currentOption).includes(opt.key)}
                  <Checkbox size={14} />
                {:else}
                  <CheckboxBlank size={14} />
                {/if}
              </div>
            {/if}

            <div class=option-menu__list-item__text>
              <div class:option-menu__list-item__title--disabled={opt.disabled} class=option-menu__list-item__title>
                <div class=menu-liste-item__title__label>
                  {opt.label}
                </div>
              </div>
              {#if opt.description}
              <div class:option-menu__list-item__description--disabled={opt.disabled} class=option-menu__list-item__description>{opt.description}</div>
              {/if}
            </div>
          </div>
        </MenuListItem>
        {/if}
      {/each}
    </MenuList>
  </FloatingMenu>
{/if}
