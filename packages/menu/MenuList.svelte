<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { fly } from "svelte/transition";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext, setContext, createEventDispatcher } from "svelte";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { writable } from "svelte/store";

  const dispatch = createEventDispatcher();

  const onParentSelect = getContext("onChildSelect");

  export let onSelect = function onSelect(kvPair) {
    dispatch("selection", kvPair);
    onParentSelect(kvPair);
  };

  const currentCandidate = writable(undefined);
  const allItems = writable([]);

  setContext("currentCandidate", currentCandidate);
  setContext("allItems", allItems);
  setContext("onSelect", onSelect);

  function previous() {
    if ($currentCandidate === undefined) {
      currentCandidate.set(0);
    } else if ($currentCandidate > 0) {
      currentCandidate.set($currentCandidate - 1);
    }
  }

  function next() {
    if ($currentCandidate === undefined) {
      currentCandidate.set(0);
    } else if ($currentCandidate < $allItems.length - 1) {
      currentCandidate.set($currentCandidate + 1);
    }
  }

  function select() {
    onSelect($allItems[$currentCandidate]);
  }

  const handleKeypress = (event) => {
    const { key } = event;
    if (key !== "Tab") event.preventDefault();
    if (key === "ArrowUp") previous();
    if (key === "ArrowDown") next();
    if (key === "Enter") select();
  };
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: white;
    border: 1px solid var(--line-gray-01);
    width: max-content;
    border-radius: var(--space-1h);
    box-shadow: var(--depth-small);
  }
</style>

<svelte:window on:keydown={handleKeypress} />

<ul transition:fly={{ duration: 100, y: -5 }} on:selection>
  <slot />
</ul>
