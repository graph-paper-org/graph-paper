<script>
  import Sidebar from "./Sidebar.svelte";
  import Dashboard from "./Dashboard.svelte";
</script>

<style>
  div {
    display: grid;
    grid-template-columns: var(--space-32x) auto;
    /* FIXME: remove need for this workaround from story */
    min-width: calc(100vw - var(--space-4x)) !important;
  }
</style>

<div>
  <Sidebar />
  <Dashboard />
</div>
