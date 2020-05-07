<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies

  export let fontSize = 11;
  export let color = "var(--cool-gray-500)";
  export let temporaryLabel = "";
  export let justify = "left";
  export let xOffset = 0;
  export let yOffset = 0;
  let leftPlot = getContext("leftPlot");
  let rightPlot = getContext("rightPlot");
  let topPlot = getContext("topPlot");
</script>

<text
  font-size={fontSize}
  fill={color}
  y={$topPlot - fontSize + yOffset}
  x={(justify === 'left' ? $leftPlot : $rightPlot) + xOffset}
  text-anchor={justify === 'left' ? 'start' : 'end'}>
  {temporaryLabel}
  <slot />
</text>
