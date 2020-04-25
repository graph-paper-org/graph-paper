# Portal

A Portal is a component that pulls its children outside of the current DOM tree, instead appending them to the end of the document. Useful for floating menus, modals, snackbars, and other elements and features that might need to "float" above the content.

This component solely handles _placement_ at the end of the document.

## usage

```
npm install @graph-paper/portal
```

```svelte
<script>
import { portal } from '@graph-paper/portal';
</script>

<button on:click={toggle}>Toggle Portal</button>

{#if active}
  <Portal>This content comes after the content.</Portal>
{/if}

This content comes BEFORE the portal.

```
