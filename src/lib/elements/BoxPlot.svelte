<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies
  import { fly } from "svelte/transition"; // eslint-disable-line import/no-extraneous-dependencies

  const defaults = getContext("defaults");

  export let xScale = getContext("xScale") || writable((v) => v);
  export let yScale = getContext("yScale") || writable((v) => v);

  export let flyValues = defaults.flyParams;
  export let lowest;
  export let lower;
  export let middle;
  export let higher;
  export let highest;
  export let x;
  export let opacity = 1;
</script>

<g in:fly={flyValues} class="small-multiple quantiles" {opacity}>
  <line
    x1={$xScale(x)}
    x2={$xScale(x)}
    y1={$yScale(lowest)}
    y2={$yScale(highest)}
    stroke="black"
  />
  <rect
    x={$xScale(x) - 5}
    y={$yScale(higher)}
    width={10}
    height={yScale(lower) - yScale(higher)}
    fill="var(--blue-slate-500)"
  />
  <line
    x1={$xScale(x) - 5}
    x2={$xScale(x) + 5}
    y1={yScale(middle)}
    y2={yScale(middle)}
    stroke="white"
    stroke-width="2"
  />
</g>
