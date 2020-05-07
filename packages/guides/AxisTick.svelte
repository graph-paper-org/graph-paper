<script>
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies

  export let dashArray;
  export let mainScale = getContext("mainScale");
  export let mainDim = getContext("mainDim");
  export let secondaryDim = getContext("secondaryDim");
  export let tickDirection = getContext("tickDirection");
  export let bodyDimension = getContext("bodyDimension");
  export let side = getContext("side");

  export let margins = getContext("margins");

  export let placement;
  export let offset = 0;
  export let length = margins.buffer; // $tickEnd;
  export let width = 1;
  export let color = "var(--cool-gray-300)";

  let sideOffset;
  $: sideOffset = side === "left" || side === "top" ? -offset : offset;
  export let step =
    $mainScale.type === "scaleBand" ? $mainScale.bandwidth() / 2 : 0;
</script>

<line
  class="tick"
  {...{ [`${mainDim}2`]: $bodyDimension + sideOffset + tickDirection * length, [`${mainDim}1`]: $bodyDimension + sideOffset, [`${secondaryDim}1`]: $mainScale(placement) + step, [`${secondaryDim}2`]: $mainScale(placement) + step }}
  stroke-dasharray={dashArray}
  stroke={color}
  stroke-width={width} />
