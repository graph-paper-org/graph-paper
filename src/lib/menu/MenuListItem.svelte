<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { onMount, getContext } from "svelte";

  const currentCandidate = getContext("currentCandidate");
  const onSelect = getContext("onSelect");
  const allItems = getContext("allItems");

  export let value;
  export let key;
  export let compact = false;
  export let dark = false;
  export let hoverable = true;

  let itemNumber;
  let bt;
  onMount(() => {
    $allItems = [...$allItems, { key, value }];
    itemNumber = $allItems.length - 1;
  });
</script>

<li
  class="menu-list-item"
  role="menuitem"
  on:mouseover={() => {
    $currentCandidate = itemNumber;
  }}
  on:click={() => {
    onSelect({ key, value, itemNumber });
  }}
>
  <button
    class:candidate={itemNumber === $currentCandidate}
    class:dark
    class:compact
    class:hoverable
    bind:this={bt}
    on:focus={() => {
      $currentCandidate = itemNumber;
    }}
  >
    <slot name="leading-icon" />
    <slot />
  </button>
</li>
