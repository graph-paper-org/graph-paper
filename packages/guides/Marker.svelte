<script context="module">
  let orders = {};
</script>

<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext, onMount, onDestroy } from "svelte";
  import { cubicOut as easing } from "svelte/easing"; // eslint-disable-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion"; // eslint-disable-line import/no-extraneous-dependencies

  export let animate = true;
  export let location;
  export let direction = "vertical";
  export let dasharray = "1,1";
  export let lineThickness = 1;
  export let color = "var(--cool-gray-550)";
  export let lineColor = color;
  export let textColor = color;
  export let labelSize = 11;
  export let labelPlacement = "top";

  const key = getContext("key");

  if (!(key in orders)) orders[key] = 0;
  const ORDER = orders[key];

  orders[key] += 1;

  export let buffer = getContext("gp:datagraphic:buffer");

  const scale =
    direction === "vertical" ? getContext("xScale") : getContext("yScale");

  // the location where the marker ends & the text begins.
  export let endLocation =
    direction === "vertical" ? getContext("topPlot") : getContext("rightPlot");
  export let rootLocation =
    direction === "vertical"
      ? getContext("bottomPlot")
      : getContext("leftPlot");

  const distance =
    direction === "vertical"
      ? getContext("bodyHeight")
      : getContext("bodyWidth");

  let pixelDirection = direction === "vertical" ? 1 : -1;

  let scaling = tweened(pixelDirection, {
    duration: animate ? 500 : 0,
    delay: ORDER * 50,
    easing,
  });

  let lineEndCoord;
  let lineStartCoord;
  let locationCoord;

  let textEndCoord; // this is how far it should be from the line itself in the line direction.
  let textOrientationCoord; // this is how much it should be shifted perpendicular to line.

  let textAnchor = "middle";

  $: lineEndCoord = $endLocation + ($distance / 2) * $scaling;
  $: lineStartCoord = $rootLocation;
  $: locationCoord = $scale(location);

  $: if (direction === "vertical") {
    if (labelPlacement === "top") {
      textEndCoord =
        $endLocation + -pixelDirection * $buffer + ($distance / 2) * $scaling;
      textAnchor = "middle";
      textOrientationCoord = locationCoord;
    }
  } else {
    textEndCoord = $endLocation + ($distance / 2) * $scaling;
    textAnchor = "end";
    if (labelPlacement === "top") {
      textOrientationCoord = locationCoord - labelSize;
    } else if (labelPlacement === "bottom") {
      textOrientationCoord = locationCoord + labelSize;
    }
  }

  $: textOrientationCoord = locationCoord;

  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  let textX = 0;
  let textY = 0;
  let dy = 0;

  $: x1 = direction === "vertical" ? locationCoord : lineStartCoord;
  $: x2 = direction === "vertical" ? locationCoord : lineEndCoord;
  $: y1 = direction === "vertical" ? lineStartCoord : locationCoord;
  $: y2 = direction === "vertical" ? lineEndCoord : locationCoord;
  $: textX = direction === "vertical" ? textOrientationCoord : textEndCoord;
  $: textY = direction === "vertical" ? textEndCoord : textOrientationCoord;
  // $: textAnchor = direction === 'vertical' ? 'middle' : 'start';
  $: dy = direction === "vertical" ? 0 : ".35em";

  // let mounted = false;
  onMount(() => {
    scaling.set(0);
  });

  onDestroy(() => {
    orders[key] -= 1;
    if (orders[key] === 0) delete orders[key];
  });
</script>

<g style="opacity: {1 - Math.abs($scaling)}" class="marker">
  <line
    {y1}
    {y2}
    {x1}
    {x2}
    stroke-width={lineThickness}
    stroke-dasharray={dasharray}
    stroke={lineColor} />
  <text
    x={textX}
    y={textY}
    {dy}
    font-size={labelSize}
    text-anchor={textAnchor}
    fill={textColor}>
    <slot />
  </text>
</g>
