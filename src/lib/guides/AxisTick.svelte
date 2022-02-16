<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies

  export let scale = getContext("gp:axis:scale");
  export let response = getContext("gp:axis:response");
  export let orientation = getContext("gp:axis:orientation");
  export let tickDirection = getContext("gp:axis:tickDirection");
  export let closestMargin = getContext("gp:axis:closestMargin");
  export let side = getContext("gp:axis:side");

  export let buffer = getContext("gp:datagraphic:buffer");

  export let placement;
  export let length;
  $: if (!length) length = $buffer;

  export let size = 1;
  export let color = "var(--cool-gray-300)";
  export let alpha = 1;
  export let dashArray;
  export let hOffset = 0;
  export let vOffset = 0;

  $: orientationOffset =
    side === "left" || side === "right" ? vOffset : hOffset;
  $: responseOffset = side === "left" || side === "right" ? hOffset : vOffset;

  $: step = $scale.type === "scaleBand" ? $scale.bandwidth() / 2 : 0;

  $: parameters = {
    [`${response}1`]: $closestMargin + responseOffset,
    [`${response}2`]: $closestMargin + tickDirection * length + responseOffset,
    [`${orientation}1`]: $scale(placement) + step + orientationOffset,
    [`${orientation}2`]: $scale(placement) + step + orientationOffset,
  };
</script>

<line
  class="tick"
  {...parameters}
  stroke-dasharray={dashArray}
  stroke={color}
  opacity={alpha}
  shape-rendering="crispEdges"
  stroke-width={size}
/>
