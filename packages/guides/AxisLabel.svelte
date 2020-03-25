<script>

import { getContext, onMount } from 'svelte';

export let side = getContext('side');
export let mainDim = getContext('mainDim');
export let secondaryDim = getContext('secondaryDim');
export let mainScale = getContext('mainScale');
export let bodyDimension = getContext('bodyDimension');
export let tickDirection = getContext('tickDirection');
export let fontSizeCorrector = getContext('fontSizeCorrector');
export let margins = getContext('margins') || { buffer: 0 };
export let tickFormatter = getContext('tickFormatter') || function format(v) { return v; };
export let align = getContext('align') || 'middle';

// the domain value where the placement should occur
export let placement;
export let offset = 0;
export let rotate = 0;
export let fontSize = 10;
export let fontWeight = 'normal';
export let color = 'black';
export let dx = 0;
export let dy = 0;

function place(v, dim, sc) {
  if (mainDim === dim) {
    return $bodyDimension
    + tickDirection * margins.buffer
    + ((side === 'top' || side === 'bottom') ? tickDirection * fontSizeCorrector : 0)
    + ((side === 'left' || side === 'top') ? -offset : offset);
  }
  let step = sc.type === 'scaleBand' ? sc.bandwidth() / 2 : 0;
  return sc(v) + step;
}

// let's set alignment dynamically as a dx property
let container;
let label;
let alignmentOffset = 0;
let yAdjustment = 0;
let mounted = false;
onMount(() => {
  mounted = true;
});

$: if (mounted && align) {
  let { width, height } = container.getBoundingClientRect();
  // let { height } = label.getBoundingClientRect();
  if (align === 'middle') alignmentOffset = -width / 2;
  else if (align === 'end') alignmentOffset = -width;
  else alignmentOffset = 0;
  yAdjustment = height / 4;
}

let transform = '';
$: transform = `${rotate !== 0
  ? `rotate(${rotate} ${place(placement, 'x', $mainScale) - alignmentOffset} ${place(placement, 'y', $mainScale)}) ` : ' '
} ${mainDim === 'x' ? `translate(0 ${yAdjustment})` : ''}`;
</script>

<g bind:this={container} transform='translate({alignmentOffset} 0)'>
<text
  bind:this={label}
  {...{
    [`${mainDim}`]: place(placement, mainDim, $mainScale),
    [`${secondaryDim}`]: place(placement, secondaryDim, $mainScale),
    dy,
    dx,
  }}
  font-size={fontSize}
  font-weight={fontWeight}
  fill={color}
  transform={transform}
>
  <slot>{tickFormatter(placement)}</slot>
</text>
</g>