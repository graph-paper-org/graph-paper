<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { spring } from "svelte/motion";

  export let params = { stiffness: 0.8, damping: 0.9 };
  export let value = 0;
  export let from = value;

  const springValue = spring(from, params);
  $: springValue.set(value);
</script>

<slot springValue={$springValue} />
