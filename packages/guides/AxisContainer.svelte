<script>
  // FIXME: this axis component should probably be refactored for the following:
  // - easier maintenance: there's a lot of specific stuff to keep up.
  // - slots / slot props: it would be great if you could easily use your own
  //   components for labels, for instance. To do this, we should probably use
  //   slots for each piece (main line, ticks, labels) and use slot props to surface up
  //   the numeric values, placement, etc. for each. This would let the implementer
  //   do whatever they want without having to make the same tedious calculations.

  import { getContext, setContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies
  import { fade } from "svelte/transition"; // eslint-disable-line import/no-extraneous-dependencies
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies

  export let side; // left, right, top, bottom
  export let mainScaleName;

  if (!mainScaleName) {
    if (side === "left" || side === "right") mainScaleName = "yScale";
    else if (side === "top" || side === "bottom") mainScaleName = "xScale";
    else mainScaleName = "xScale";
  }

  export let scale = getContext(mainScaleName);
  export let closestMargin = getContext(`${side}Plot`);

  let obverse;
  let minDim;
  let maxDim;

  if (side === "left") obverse = "right";
  if (side === "right") obverse = "left";
  if (side === "top") obverse = "bottom";
  if (side === "bottom") obverse = "top";

  if (side === "left" || side === "right") {
    minDim = "bottom";
    maxDim = "top";
  }

  if (side === "top" || side === "bottom") {
    minDim = "left";
    maxDim = "right";
  }

  export let farthestMargin = getContext(`${obverse}Plot`);

  // minScaleMargin and maxScaleMargin represents the
  // max and min dimensions (eg the ends of the AxisLine)
  export let minScaleMargin = getContext(`${minDim}Plot`);
  export let maxScaleMargin = getContext(`${maxDim}Plot`);

  // TEXT ANCHOR
  let defaultTextAnchor;
  if (side === "left") {
    defaultTextAnchor = "end";
    // if (rotate) defaultTextAnchor = 'middle';
  } else if (side === "right") {
    defaultTextAnchor = "start";
    // if (rotate) defaultTextAnchor = 'middle';
  } else if (side === "top" || side === "bottom") {
    defaultTextAnchor = "middle";
    // if (rotate && side === 'top') defaultTextAnchor = 'end';
    // if (rotate && side === 'bottom') defaultTextAnchor = 'start';
  }

  export let align = defaultTextAnchor;

  const defaults = getContext("defaults");

  export let tickCount = 5;

  function orderMagnitude(n) {
    let order = Math.floor(Math.log(n) / Math.LN10 + 0.000000001); // because float math sucks like that
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
    if (sc.type === "numeric" || sc.type === "linear" || sc.type === "time") {
      return sc.ticks(tickCount);
    }
    if (sc.type === "log") {
      return symLogTicks(sc.domain()[1]);
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
  } else if (typeof ticks === "function") {
    // if you pass in a function, the function operates
    // on the xScale accordingly and returns whatever it needs
    // to be an array
    TICKS = ticks($scale);
  } else {
    TICKS = getDefaultTicks($scale, $closestMargin);
  }

  // how many of these are derived from side?

  export let tickDirection = side === "right" || side === "bottom" ? 1 : -1;

  export let fadeValues = defaults.fadeParams;

  // tickFormatter is a function that transforms the tick to some kind of string representation
  const tickFormatterStore = writable(
    $scale.type === "time" ? $scale.tickFormat(tickCount) : (t) => t
  );
  export let tickFormatter = $tickFormatterStore;
  $: $tickFormatterStore = tickFormatter;

  // the main dim is actually probably more like the oppositeDimension.
  let response = side === "left" || side === "right" ? "x" : "y";
  // the secondaryDim is the orientation;
  let orientation = side === "left" || side === "right" ? "y" : "x";

  // axis system context setting.
  // children like AxisLabel consume these.

  setContext("gp:axis:response", response);
  setContext("gp:axis:orientation", orientation);
  setContext("gp:axis:scale", scale);
  setContext("gp:axis:side", side);
  setContext("gp:axis:closestMargin", closestMargin);
  setContext("gp:axis:farthestMargin", farthestMargin);
  setContext("gp:axis:minScaleMargin", minScaleMargin);
  setContext("gp:axis:maxScaleMargin", maxScaleMargin);

  setContext("gp:axis:tickDirection", tickDirection);

  setContext("gp:axis:tickFormatterStore", tickFormatterStore);
  setContext("align", align);
</script>

<g in:fade={fadeValues} class="{side}-axis">
  <slot
    name="ticks"
    ticks={TICKS}
    closestMargin={$closestMargin}
    farthestMargin={$farthestMargin} />
  <slot name="border" />
  <slot name="labels" tickFormatter={$tickFormatterStore} ticks={TICKS} />
</g>
