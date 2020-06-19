<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { setContext, onMount } from "svelte";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { writable, derived } from "svelte/store";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { tweened } from "svelte/motion";
  import {
    scalePoint,
    scaleLinear,
    scaleSymlog,
    scaleTime,
    scaleBand,
  } from "d3-scale";

  import { getMousePosition, defaultMousePosition } from "./mouse-position";
  import { getDomainFromExtents } from "./extents";

  export let svg;
  // key is used to uniquely identify a DataGraphic.
  // users can supply their own, but one must exist.
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  export let key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  export let xMin;
  export let xMax;
  export let xDomain = [xMin, xMax];
  export let xDomainTween = { duration: 0 };

  export let yMin;
  export let yMax;
  export let yDomain = [yMin, yMax];
  export let yDomainTween = { duration: 0 };

  export let xType = "linear";
  export let yType = "linear";

  export let left = 50;
  export let right = 16;
  export let top = 50;
  export let bottom = 20;
  export let buffer = 5;

  // borders
  export let borderColor = "var(--cool-gray-200)";
  export let borderSize = 1;
  export let borderOpacity = 1;
  export let border = false;
  export let leftBorder = border;
  export let rightBorder = border;
  export let topBorder = border;
  export let bottomBorder = border;
  export let leftBorderColor = borderColor;
  export let rightBorderColor = borderColor;
  export let topBorderColor = borderColor;
  export let bottomBorderColor = borderColor;
  export let leftBorderSize = borderSize;
  export let rightBorderSize = borderSize;
  export let topBorderSize = borderSize;
  export let bottomBorderSize = borderSize;
  export let leftBorderOpacity = borderOpacity;
  export let rightBorderOpacity = borderOpacity;
  export let topBorderOpacity = borderOpacity;
  export let bottomBorderOpacity = borderOpacity;

  export let backgroundColor = "transparent";

  let borders = [];
  $: borders = [
    [
      leftBorder,
      leftBorderColor,
      leftBorderSize,
      leftBorderOpacity,
      $leftPlot,
      $leftPlot,
      $topPlot - topBorderSize / 2,
      $bottomPlot + bottomBorderSize / 2,
    ],
    [
      rightBorder,
      rightBorderColor,
      rightBorderSize,
      rightBorderOpacity,
      $rightPlot,
      $rightPlot,
      $topPlot - topBorderSize / 2,
      $bottomPlot + bottomBorderSize / 2,
    ],
    [
      topBorder,
      topBorderColor,
      topBorderSize,
      topBorderOpacity,
      $leftPlot,
      $rightPlot,
      $topPlot,
      $topPlot,
    ],
    [
      bottomBorder,
      bottomBorderColor,
      bottomBorderSize,
      bottomBorderOpacity,
      $leftPlot,
      $rightPlot,
      $bottomPlot,
      $bottomPlot,
    ],
  ];

  export let xPadding = 0.5;
  export let xInnerPadding = xPadding;
  export let xOuterPadding = xPadding;
  export let yPadding = 0.5;
  export let yInnerPadding = yPadding;
  export let yOuterPadding = yPadding;

  const DEFAULTS = {
    elementWidth: 60,
    axisTickFontSize: 10,
    flyParams: { y: 10, duration: 300 },
    fadeParams: { duration: 300 },
  };

  setContext("defaults", DEFAULTS);
  setContext("key", key);

  let container;

  export let width;
  export let height;

  // graphic width, graphic height, body width, body height
  let internalWidth = width;

  let internalHeight = height === undefined ? 300 : height;

  // if width is set (when it was not previously),
  // update the internalWidth and internalHeight.
  $: if (width) internalWidth = width;
  $: if (height) internalHeight = height;
  export let graphicWidth = writable(internalWidth);
  export let graphicHeight = writable(internalHeight);

  let internalLeft = writable(left);
  let internalRight = writable(right);
  let internalTop = writable(top);
  let internalBottom = writable(bottom);

  // FIXME: this could be simplified. We do not need to be using derived stores
  // below for leftPlot etc., since the only thing that use these internal stores
  // are derived stores.
  $: internalLeft.set(left);
  $: internalRight.set(right);
  $: internalTop.set(top);
  $: internalBottom.set(bottom);

  let internalBuffer = writable(buffer);
  $: internalBuffer.set(buffer);
  setContext("gp:datagraphic:buffer", internalBuffer);

  // see onMount below for the case where the width & height props are not defined.
  $: $graphicWidth = internalWidth;
  $: $graphicHeight = internalHeight;

  export let bodyWidth = derived(
    [graphicWidth, internalLeft, internalRight],
    ([$width, $left, $right]) => $width - $left - $right
  );

  export let bodyHeight = derived(
    [graphicHeight, internalTop, internalBottom],
    ([$height, $top, $bottom]) => $height - $top - $bottom
  );

  // set the locations of the plot bounds
  export let leftPlot = derived(internalLeft, ($left) => $left);
  export let rightPlot = derived(
    [graphicWidth, internalRight],
    ([$width, $right]) => $width - $right
  );

  export let topPlot = derived(internalTop, ($top) => $top);
  export let bottomPlot = derived(
    [graphicHeight, internalBottom],
    ([$height, $bottom]) => $height - $bottom
  );

  setContext("graphicWidth", graphicWidth);
  setContext("graphicHeight", graphicHeight);
  setContext("bodyWidth", bodyWidth);
  setContext("bodyHeight", bodyHeight);

  setContext("leftPlot", leftPlot);
  setContext("rightPlot", rightPlot);
  setContext("topPlot", topPlot);
  setContext("bottomPlot", bottomPlot);

  function getScaleFunction(type) {
    if (type === "time") return scaleTime;
    if (type === "scalePoint") return scalePoint;
    if (type === "scaleBand") return scaleBand;
    if (type === "numeric" || type === "linear") return scaleLinear;
    if (type === "log") return scaleSymlog;
    return scalePoint;
  }

  // FIXME: refactor.
  function createXPointScale(values, leftRange, rightRange) {
    const scaleFunction = getScaleFunction(xType);
    let scale = scaleFunction().domain(values).range([leftRange, rightRange]);
    if (xType === "scalePoint") {
      scale = scale.padding(xPadding);
    }
    if (xType === "scaleBand") {
      scale = scale.paddingInner(xInnerPadding).paddingOuter(xOuterPadding);
    }
    scale.type = xType;
    return scale;
  }

  // FIXME: refactor.
  function createYPointScale(values, bottomRange, topRange) {
    // const scaleFunction = yType === 'scalePoint' ? scalePoint : scaleLinear;
    const scaleFunction = getScaleFunction(yType);

    let scale = scaleFunction().domain(values).range([bottomRange, topRange]);
    if (yType === "scalePoint") {
      scale = scale.padding(yPadding);
    }
    if (yType === "scaleBand") {
      scale = scale.paddingInner(yInnerPadding).paddingOuter(yOuterPadding);
    }
    scale.type = yType;
    return scale;
  }

  // /////////////////////////////////////////////////////////////////////////

  function firstDefinedValue(...vars) {
    let i = 0;
    while (i < vars.length) {
      const v = vars[i];
      if (v !== undefined) {
        return v;
      }
      i += 1;
    }
    return undefined;
  }

  // Extents (bounds of the data elements) & Domains (bounds of the graph, based on
  // user specifications & extents)

  // if tweening is set for a domain, then we will update the tween params
  // once the mounting is finished.

  function isContinuous(t) {
    return t === "linear" || t === "time";
  }

  let internalXDomainTween = { duration: 0 };
  let internalYDomainTween = { duration: 0 };

  function defaultDomain(scaleType) {
    if (scaleType === "time") return [new Date(), new Date()];
    if (scaleType === "linear") return [0, 1];
    return [];
  }

  function initializeDomainStore(scaleType, domain) {
    return isContinuous(scaleType)
      ? tweened(domain, { duration: 0 })
      : writable(domain);
  }

  const initialXDomain = defaultDomain(xType);
  const initialYDomain = defaultDomain(yType);

  let internalXDomain = initializeDomainStore(xType, initialXDomain);
  let internalYDomain = initializeDomainStore(yType, initialYDomain);

  // update the scale stores if the domain changes.
  // FIXME: refactor these functions to take range arguments as well,
  // and xPadding. etc. etc. – this should be completely reactive
  // w/ all relevant scale arguments.

  export let xScaleStore = writable(
    createXPointScale($internalXDomain, $leftPlot, $rightPlot)
  );
  export let yScaleStore = writable(
    createYPointScale($internalYDomain, $bottomPlot, $topPlot)
  );

  export let xScale = $xScaleStore;
  export let yScale = $yScaleStore;

  $: xScale = $xScaleStore;
  $: yScale = $yScaleStore;

  // These extents are set within data graphic elements like <Line /> or <Point />
  // internally. The children of DataGraphic will reactively update these stores
  // and DataGraphic will then reactively update the domain (unless the user specifies
  // a domain / min / max explicitly).
  const xExtents = writable({});
  const yExtents = writable({});

  setContext("gp:datagraphic:xExtents", xExtents);
  setContext("gp:datagraphic:yExtents", yExtents);

  $: xPlotExtents = getDomainFromExtents($xExtents);
  $: yPlotExtents = getDomainFromExtents($yExtents);

  $: if (isContinuous(xType)) {
    internalXDomain.set(
      [
        firstDefinedValue(xMin, xDomain[0], xPlotExtents[0], initialXDomain[0]),
        firstDefinedValue(xMax, xDomain[1], xPlotExtents[1], initialXDomain[1]),
      ],
      internalXDomainTween
    );
  } else {
    $internalXDomain = xDomain;
  }

  $: if (isContinuous(yType)) {
    internalYDomain.set(
      [
        firstDefinedValue(yMin, yDomain[0], yPlotExtents[0], initialYDomain[0]),
        firstDefinedValue(yMax, yDomain[1], yPlotExtents[1], initialYDomain[1]),
      ],
      internalYDomainTween
    );
  } else {
    $internalYDomain = yDomain;
  }

  $: $xScaleStore = createXPointScale($internalXDomain, $leftPlot, $rightPlot);
  $: $yScaleStore = createYPointScale($internalYDomain, $bottomPlot, $topPlot);
  setContext("xScale", xScaleStore);
  setContext("yScale", yScaleStore);

  const mousePositionStore = writable(defaultMousePosition());
  setContext("gp:datagraphic:mousePosition", mousePositionStore);

  export let dataGraphicMounted = false;

  export let mousePosition = defaultMousePosition();

  // FIXME: this flow always felt a little weird. We should remove it
  // entirely.
  let resizer;
  onMount(() => {
    dataGraphicMounted = true;
    // the resize observer will look at the parent element
    // in cases where width or height is not defined.
    resizer = new ResizeObserver(([e]) => {
      if (width === undefined) internalWidth = e.contentRect.width;
      if (height === null) internalHeight = e.contentRect.height;
    });
    resizer.observe(container.parentElement);
  });

  $: if (dataGraphicMounted) {
    // here, we are technically waiting a tick before updating the domain tweens.
    // This gives room for all the extents to be calculated before jumping into animating them.
    // Without this, the graph kind of springs into place, which does not feel ideal.
    setTimeout(() => {
      internalXDomainTween = xDomainTween;
      internalYDomainTween = yDomainTween;
    });
  }

  $: mousePosition = $mousePositionStore; // eslint-disable-line
</script>

<style>
  .data-graphic-container {
    display: grid;
    align-content: center;
    justify-content: center;
  }
</style>

<div
  bind:this={container}
  class="data-graphic-container"
  style="width: {$graphicWidth}px; height: {$graphicHeight}px;">
  <svg
    style="width: {$graphicWidth}px; height: {$graphicHeight}px;"
    bind:this={svg}
    shape-rendering="auto"
    viewbox="0 0 {$graphicWidth}
    {$graphicHeight}"
    on:mousemove={(e) => {
      $mousePositionStore = getMousePosition(e, svg, {
        xScale: $xScaleStore,
        yScale: $yScaleStore,
        left: $leftPlot,
        right: $rightPlot,
        top: $topPlot,
        bottom: $bottomPlot,
      });
    }}
    on:mouseleave={() => {
      $mousePositionStore = defaultMousePosition();
    }}
    on:click
    on:mousedown
    on:mouseup
    on:mousemove>
    <rect
      x={$leftPlot}
      y={$topPlot}
      width={$bodyWidth}
      height={$bodyHeight}
      fill={backgroundColor} />

    <clipPath id="graphic-body-{key}">
      <!-- this clip area determines what renders in slot=body and slot=background-body -->
      <rect
        x={$leftPlot}
        y={$topPlot}
        width={$bodyWidth}
        height={$bodyHeight} />

    </clipPath>

    {#if dataGraphicMounted}
      <g
        id="graphic-body-background-{key}"
        style="clip-path: url(#graphic-body-{key})">
        <slot
          name="body-background"
          {mousePosition}
          {xScale}
          {yScale}
          left={$leftPlot}
          right={$rightPlot}
          top={$topPlot}
          bottom={$bottomPlot}
          width={$graphicWidth}
          height={$graphicHeight} />
      </g>
    {/if}

    {#if dataGraphicMounted}
      <g>
        <slot
          name="background"
          {mousePosition}
          {xScale}
          {yScale}
          left={$leftPlot}
          right={$rightPlot}
          top={$topPlot}
          bottom={$bottomPlot}
          width={$graphicWidth}
          height={$graphicHeight} />
      </g>
    {/if}

    {#if dataGraphicMounted}
      <g id="graphic-body-{key}" style="clip-path: url(#graphic-body-{key})">
        <slot
          {mousePosition}
          name="body"
          {xScale}
          {yScale}
          left={$leftPlot}
          right={$rightPlot}
          top={$topPlot}
          bottom={$bottomPlot}
          width={$graphicWidth}
          height={$graphicHeight} />
      </g>
    {/if}

    <!-- generalized slot at body level -->
    {#if dataGraphicMounted}
      <slot
        {mousePosition}
        {xScale}
        {yScale}
        left={$leftPlot}
        right={$rightPlot}
        top={$topPlot}
        bottom={$bottomPlot}
        width={$graphicWidth}
        height={$graphicHeight} />
    {/if}

    <use
      clip-path="url(#graphic-body-{key})"
      xlink:href="#graphic-body-content={key}"
      fill="transparent" />

    <!-- Annotation layers – for additional points, comments, etc. that must sit above everything else -->
    {#if dataGraphicMounted}
      <slot
        name="annotation"
        {mousePosition}
        {xScale}
        {yScale}
        left={$leftPlot}
        right={$rightPlot}
        top={$topPlot}
        bottom={$bottomPlot}
        width={$graphicWidth}
        height={$graphicHeight} />
    {/if}

    <!-- data graphic borders -->
    {#each borders as [showBorder, color, size, opacity, x1, x2, y1, y2]}
      {#if showBorder}
        <line
          {x1}
          {x2}
          {y1}
          {y2}
          stroke={color}
          stroke-width={size}
          {opacity} />
      {/if}
    {/each}

    {#if dataGraphicMounted}
      <slot
        name="interaction"
        {mousePosition}
        {xScale}
        {yScale}
        left={$leftPlot}
        right={$rightPlot}
        top={$topPlot}
        bottom={$bottomPlot}
        width={$graphicWidth}
        height={$graphicHeight} />
    {/if}
  </svg>
</div>
