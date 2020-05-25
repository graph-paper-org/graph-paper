<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies

  export let scale = getContext("gp:axis:scale");
  export let side = getContext("gp:axis:side");
  export let response = getContext("gp:axis:response");
  export let orientation = getContext("gp:axis:orientation");
  export let closestMargin = getContext("gp:axis:closestMargin");
  export let minScaleMargin = getContext("gp:axis:minScaleMargin");
  export let maxScaleMargin = getContext("gp:axis:maxScaleMargin");
  export let start;
  export let end;
  export let color = "var(--cool-gray-400)";
  export let alpha = 1;
  export let size = 1;
  export let offset = 0; // FIXME: replace with an hOffset and vOffset.
  export let dashArray;

  $: if (!start) start = $scale.domain()[0]; //eslint-disable-line
  $: if (!end) end = $scale.domain().slice(-1)[0]; //eslint-disable-line
  let sideOffset = side === "left" || side === "top" ? -offset : offset;

  $: parameters = {
    [`${orientation}1`]: $minScaleMargin,
    [`${orientation}2`]: $maxScaleMargin,
    [`${response}1`]: $closestMargin + sideOffset,
    [`${response}2`]: $closestMargin + sideOffset,
  };
</script>

<line
  {...parameters}
  stroke={color}
  stroke-width={size}
  opacity={alpha}
  shape-rendering="crispEdges"
  stroke-dasharray={dashArray} />
