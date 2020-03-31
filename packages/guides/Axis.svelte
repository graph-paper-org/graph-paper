<script>

// FIXME: this axis component should probably be refactored for the following:
// - easier maintenance: there's a lot of specific stuff to keep up.
// - slots / slot props: it would be great if you could easily use your own
//   components for labels, for instance. To do this, we should probably use
//   slots for each piece (main line, ticks, labels) and use slot props to surface up
//   the numeric values, placement, etc. for each. This would let the implementer
//   do whatever they want without having to make the same tedious calculations.

import { tweened } from 'svelte/motion'; // eslint-disable-line import/no-extraneous-dependencies

import { getContext, setContext } from 'svelte'; // eslint-disable-line import/no-extraneous-dependencies
import { fade } from 'svelte/transition'; // eslint-disable-line import/no-extraneous-dependencies

import AxisLabel from './AxisLabel.svelte';
import AxisLine from './AxisLine.svelte';
import AxisTick from './AxisTick.svelte';

export let side; // left, right, top, bottom
export let mainScaleName;

if (!mainScaleName) {
  if (side === 'left' || side === 'right') mainScaleName = 'yScale';
  else if (side === 'top' || side === 'bottom') mainScaleName = 'xScale';
  else mainScaleName = 'xScale';
}

export let mainScale = getContext(mainScaleName);
export let bodyDimension = getContext(`${side}Plot`);
export let rotate = 0;

let obverse;
let minDim;
let maxDim;

if (side === 'left') obverse = 'right';
if (side === 'right') obverse = 'left';
if (side === 'top') obverse = 'bottom';
if (side === 'bottom') obverse = 'top';

if (side === 'left' || side === 'right') {
  minDim = 'bottom';
  maxDim = 'top';
}

if (side === 'top' || side === 'bottom') {
  minDim = 'left';
  maxDim = 'right';
}


export let obverseDimension = getContext(`${obverse}Plot`);

// minimumDimension and maximumDimension represents the
// max and min dimensions (eg the ends of the AxisLine)
export let minimumDimension = getContext(`${minDim}Plot`);
export let maximumDimension = getContext(`${maxDim}Plot`);

// TEXT ANCHOR
let defaultTextAnchor;
if (side === 'left') {
  defaultTextAnchor = 'end';
  // if (rotate) defaultTextAnchor = 'middle';
} else if (side === 'right') {
  defaultTextAnchor = 'start';
  // if (rotate) defaultTextAnchor = 'middle';
} else if (side === 'top' || side === 'bottom') {
  defaultTextAnchor = 'middle';
  // if (rotate && side === 'top') defaultTextAnchor = 'end';
  // if (rotate && side === 'bottom') defaultTextAnchor = 'start';
}

export let align = defaultTextAnchor;

const defaults = getContext('defaults');
const margins = getContext('margins');

export let tickDashArray;

export let tickCount = 5;

function orderMagnitude(n) {
  let order = Math.floor(Math.log(n) / Math.LN10
                       + 0.000000001); // because float math sucks like that
  return 10 ** order;
}

function symLogTicks(topVal) {
  // symLogTicks is needed until https://github.com/d3/d3-scale/issues/162 is resolved.
  const upper = orderMagnitude(topVal);
  let current = upper;
  const ticks = [upper];
  while (current > 1) {
    current /= 10;
    ticks.push(current);
  }
  ticks.reverse();
  return ticks;
}

function getDefaultTicks(sc) {
  if (sc.type === 'numeric' || sc.type === 'linear' || sc.type === 'time') {
    return sc.ticks(tickCount);
  } if (sc.type === 'log') {
    return symLogTicks($mainScale.domain()[1]);
  }
  return sc.domain().reduce((acc, v, i, source) => {
    // let's filter to get the right number of ticks.
    const every = Math.floor(source.length / tickCount);
    if (i % every === 0) {
      acc.push(v);
    }
    return acc;
  }, []);
}

export let ticks;
// we will need to internally calculate TICKS depending on the passed value
// of ticks.
let TICKS;
$: if (Array.isArray(ticks)) {
  TICKS = ticks;
} else if (typeof ticks === 'function') {
  // if you pass in a function, the function operates
  // on the xScale accordingly and returns whatever it needs
  // to be an array
  TICKS = ticks($mainScale);
} else {
  TICKS = getDefaultTicks($mainScale);
}

// change TICKS to have x, y, x1, x2, y1, y2

export let tickDirection = side === 'right' || side === 'bottom' ? 1 : -1;

export let fadeValues = defaults.fadeParams;
export let tickFontSize = defaults.axisTickFontSize;

export let lineStyle = (side === 'left' || side === 'right') ? 'long' : 'short';
export let tickFormatter = $mainScale.type === 'time' ? $mainScale.tickFormat(tickCount) : (t) => t;

export let showTicks = true;
export let showBorder = false;
export let showLabels = true;

let mainDim = (side === 'left' || side === 'right') ? 'x' : 'y';
let secondaryDim = (side === 'left' || side === 'right') ? 'y' : 'x';

let fontSizeCorrector = (side === 'bottom') ? tickFontSize : margins.buffer;

// axis system context setting.
// children like AxisLabel consume these.

setContext('mainDim', mainDim);
setContext('secondaryDim', secondaryDim);
setContext('mainScale', mainScale);
setContext('side', side);
setContext('bodyDimension', bodyDimension);
setContext('obverseDimension', obverseDimension);
setContext('minimumDimension', minimumDimension);
setContext('maximumDimension', maximumDimension);

setContext('tickDirection', tickDirection);

setContext('fontSizeCorrector', fontSizeCorrector);
setContext('tickFormatter', tickFormatter);
setContext('align', align);

let R = tweened(-1, { duration: 500 });
setInterval(() => {
  $R = $R < 0 ? 1 : -1;
}, 1000);
</script>

  <g in:fade={fadeValues} class="{side}-axis">
  
    {#if showTicks}
      <slot name="ticks" ticks={TICKS}>
          {#each TICKS as tick, i (tick)}
              <AxisTick dashArray={tickDashArray} placement={tick} />
              {#if lineStyle === 'long'}
                <AxisTick dashArray={tickDashArray} placement={tick} tickDirection={-1} length={$bodyDimension - $obverseDimension} />
              {/if}
          {/each}
      </slot>
    {/if}

  <slot name='border'>
    {#if showBorder}
      <AxisLine  />
      {/if}
  </slot>

  {#if showLabels}
    <slot name="labels" tickFormatter={tickFormatter} ticks={TICKS}>
        {#each TICKS as tick, i}
            <AxisLabel rotate={rotate} placement={tick} align={align}>
              {tickFormatter ? tickFormatter(tick) : tick}
            </AxisLabel>
        {/each}
    </slot>
  {/if}

  </g>