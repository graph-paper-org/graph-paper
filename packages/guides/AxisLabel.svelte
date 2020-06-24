<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies

  export let buffer = getContext("gp:datagraphic:buffer");

  export let side = getContext("gp:axis:side");
  export let response = getContext("gp:axis:response");
  export let orientation = getContext("gp:axis:orientation");
  export let scale = getContext("gp:axis:scale");
  export let closestMargin = getContext("gp:axis:closestMargin");
  export let tickDirection = getContext("gp:axis:tickDirection");
  export let tickFormatterStore = getContext("gp:axis:tickFormatterStore");
  export let tickFormatter;

  export let color = "var(--cool-gray-700)";
  export let alpha = 1;
  // the domain value where the placement should occur
  export let placement;
  export let fontSize = "10px";
  export let fontWeight = "normal";
  export let dx;
  export let dy;

  $: if (!tickFormatter) {
    tickFormatter = $tickFormatterStore;
  } else {
    tickFormatter = (v) => v;
  }

  function place(v, dim, sc, bd, buff) {
    if (response === dim) {
      return (
        bd +
        tickDirection * buff +
        (side === "left" || side === "top" ? -buff : buff)
      );
    }
    let step = sc.type === "scaleBand" ? sc.bandwidth() / 2 : 0;
    return sc(v) + step;
  }

  // let's set alignment dynamically as a dx property

  let textAnchor = "middle";
  if (side === "left") textAnchor = "end";
  if (side === "right") textAnchor = "start";

  let dyInternal;
  $: if (orientation === "y") {
    dyInternal = ".35em";
  } else if (side === "bottom") {
    dyInternal = "1em";
  } else dyInternal = undefined;

  $: parameters = {
    [`${response}`]: place(
      placement,
      response,
      $scale,
      $closestMargin,
      $buffer
    ),
    [`${orientation}`]: place(
      placement,
      orientation,
      $scale,
      $closestMargin,
      $buffer
    ),
    dy: dyInternal,
    "text-anchor": textAnchor,
  };
  $: containerParams =
    dx || dy ? `transform: translate(${dx || 0}, ${dy || 0})` : undefined;
</script>

<g style={containerParams}>
  <text
    {...parameters}
    style="font-size: {fontSize}; font-weight: {fontWeight};"
    fill={color}
    opacity={alpha}>
    <slot>{tickFormatter(placement)}</slot>
  </text>
</g>
