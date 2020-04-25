<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount, createEventDispatcher } from 'svelte';

  import { FloatingMenu, MenuList, MenuListItem } from '@graph-paper/menu';
  import { ArrowheadDown, CheckBox, CheckBoxBlank } from '@graph-paper/icons';
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

<style>
  .activating-button {
    padding: var(--space-1h);
    padding-left: var(--space-base);
    padding-right: var(--space-1h);
    font-size: var(--text-015);
    margin:0;
    text-align: left;
    background-color: white;
    display:grid;
    grid-auto-flow: column;
    width: max-content;
    grid-column-gap: var(--space-1h);
    color: var(--cool-gray-650);
    border-radius: var(--space-1h);
  }

  .down-caret {
    display: grid;
    align-items: center;
    justify-items: center;
    justify-self: end;
    transition: transform 100ms;
  }

  .down-caret--active {
    transform: rotate(-180deg);
  }

  button:disabled {
    color: var(--cool-gray-500);
    font-style: italic;
    background-color: var(--cool-gray-subtle);
  }

  .activating-button__title {
    color: var(--cool-gray-700);
    padding-left: var(--space-base);
    width: max-content;
  }

  .menu-list-item__content {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: var(--space-2x);
    align-items: start;
    justify-content: start;
    --color: var(--cool-gray-700);
    --subcolor: var(--cool-gray-650);
  }

  .menu-list-item__icon {
    display: grid;
    align-items: center;
    color: var(--color);
  }

  .menu-list-item__icon--disabled {
    --color: var(--cool-gray-350);
  }

  .menu-list-item__text {
    width: 100%;
    justify-self: stretch;
  }

  .menu-list-item__title {
    font-size: var(--text-02);
    color: var(--color);
  }

  .menu-list-item__description {
    padding-top: var(--space-1q);
    max-width: var(--space-32x);
    font-size: var(--text-015);
    color: var(--subcolor);
  }

  .active {
    background-color: var(--cool-gray-150);
  }

  hr {
    border: none;
    border-bottom: 1px solid var(--cool-gray-200);
    padding:0px;
    margin:0px;
  }

  .menu-list-item__title--disabled {
    --color: var(--cool-gray-600);
    font-style: italic;
  }

  .menu-list-item__description--disabled {
    --subcolor: var(--cool-gray-600);
    font-style: italic;
  }
</style>

<svelte:window on:keydown={keyDown} />

<div class="menu-button" bind:this={buttonParent}>
  {#if title}
    <div bind:this={titleElement} class="activating-button__title overline-text--01">{title}</div>
  {/if}
  <button
    bind:this={button}
    class="activating-button"
    on:click={toggle}
    style="min-width: calc({titleWidth}px + var(--space-base));"
    class:active={open}
    disabled={!active}
    use:tooltipAction={showTooltip ? { text: description, location: descriptionLocation } : null}
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
        <div class="down-caret" class:down-caret--active={open}>
          <ArrowheadDown size=16 />
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
          <hr />
        {:else}
          <MenuListItem {compact} hoverable={opt.disabled !== true} key={opt.key} value={opt}>

          <div class=menu-list-item__content>
            {#if multi}
              <div
                class=menu-list-item__icon
                class:menu-list-item__icon--disabled={opt.disabled === true}
              >
                {#if keys(currentOption).includes(opt.key)}
                  <CheckBox size={14} />
                {:else}
                  <CheckBoxBlank size={14} />
                {/if}
              </div>
            {/if}

            <div class=menu-list-item__text>
              <div class:menu-list-item__title--disabled={opt.disabled} class=menu-list-item__title>
                <div class=menu-liste-item__title__label>
                  {opt.label}
                </div>
              </div>
              {#if opt.description}
              <div class:menu-list-item__description--disabled={opt.disabled} class=menu-list-item__description>{opt.description}</div>
              {/if}
            </div>
          </div>
        </MenuListItem>
        {/if}
      {/each}
    </MenuList>
  </FloatingMenu>
{/if}
