<script>
  import { createEventDispatcher, tick } from "svelte";
  import { Button } from "../../../../button";
  import { onClickOutside } from "../../../../core/utils";
  import {
    CaretRight,
    CheckboxBlank,
    Checkbox,
    LineChart,
  } from "../../../../icons";
  import FloatingChild from "./list/FloatingChild.svelte";
  import List from "./list/List.svelte";
  import ListItem from "./list/ListItem.svelte";
  import Divider from "./list/Divider.svelte";
  import { Stack } from "../../../../stack";
  import { Close } from "../../../../icons";

  const dispatch = createEventDispatcher();

  export let toggled = false;
  export let multi = true;
  export let options;

  let container;
  let element;
  let removeListener;
  function toggle() {
    toggled = !toggled;
    if (toggled) {
      removeListener = onClickOutside(() => {
        toggled = false;
      }, element);
    } else if (removeListener) removeListener();
  }

  function handleKeydown({ key }) {
    if (key === "Escape") {
      toggled = false;
      if (removeListener) removeListener();
    }
  }

  export let selections = multi ? [] : options[0].key;

  function clearSelection() {
    selections = multi ? [] : options[0].key;
    dispatch("selection", selections);
  }

  function toggleListItem(value, isMulti) {
    return () => {
      // closes over value
      if (isMulti) {
        if (selections.includes(value))
          selections = [...selections.filter((s) => s !== value)];
        else selections = [...selections, value];
      } else {
        selections = value;
      }
      dispatch("selection", selections);
      if (!isMulti) {
        toggle();
      }
    };
  }
</script>

<style>
  .gafc {
    display: grid;
    grid-auto-flow: column;
    align-self: stretch;
    height: 100%;
    align-items: center;
    align-content: center;
  }

  .dimension-button {
    width: 100%;
    display: grid;
  }

  .dimension-button__content {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
    width: 100%;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="dimension-button" bind:this={container}>
  <Button level="low" on:click={toggle}>
    <div class="dimension-button__content">
      <slot />
      <span
        class="gafc"
        style="transition: transform 75ms; transform: rotate({toggled ? -180 : 0}deg);">
        <CaretRight size="1em" />
      </span>
    </div>
  </Button>
</div>

<FloatingChild active={toggled} bind:element parent={container}>
  <List>
    <li style="display: grid; justify-content: stretch; width: 100%;">
      <button>Aggregate</button>
      <button>Compare</button>
    </li>
    <Divider />
    {#if multi}
      <ListItem on:click={clearSelection}>
        <span slot="secondary">

          {#if selections.length}
            clear {selections.length} selection{selections.length === 1 ? '' : 's'}
          {:else}showing all{/if}

        </span>
        <span slot="right">
          {#if selections.length}
            <Close size="1em" color="var(--cool-gray-500)" />
          {/if}
        </span>

      </ListItem>
      <Divider />
    {/if}
    {#each options as option}
      <ListItem on:click={toggleListItem(option.key, multi)}>
        <span slot="primary">{option.label}</span>
        <span slot="secondary">
          {#if option.description}{option.description}{/if}
        </span>
        <span
          slot="right"
          style="color: {selections.includes(option.key) ? 'blue' : 'var(--cool-gray-400)'}">
          {#if selections.includes(option.key)}
            <Checkbox size="1em" />
          {:else}
            <CheckboxBlank size="1em" />
          {/if}
        </span>
      </ListItem>
    {/each}
  </List>
</FloatingChild>
