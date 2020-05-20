<script>
  // FIXME: this axis component should probably be refactored for the following:
  // - easier maintenance: there's a lot of specific stuff to keep up.
  // - slots / slot props: it would be great if you could easily use your own
  //   components for labels, for instance. To do this, we should probably use
  //   slots for each piece (main line, ticks, labels) and use slot props to surface up
  //   the numeric values, placement, etc. for each. This would let the implementer
  //   do whatever they want without having to make the same tedious calculations.

  import AxisContainer from "./AxisContainer.svelte";
  import AxisLabel from "./AxisLabel.svelte";
  import AxisLine from "./AxisLine.svelte";
  import AxisTick from "./AxisTick.svelte";

  export let side; // left, right, top, bottom
  export let lineStyle = side === "left" ? "long" : "short";

  export let ticks;
  export let tickFormatter;

  export let showLabels = true;
  export let showTicks = true;
  export let showLine = false;

  // AxisLabel, AxisLine, AxisTick props.
  export let color;
  export let alpha;
  export let size;
  export let dashArray;
  export let fontSize;

  export let tickColor = color;
  export let tickAlpha = alpha;
  export let tickSize = size;
  export let tickDashArray = dashArray;

  export let labelColor = color;
  export let labelAlpha = alpha;

  export let lineColor = color;
  export let lineAlpha = alpha;
  export let lineSize = size;
  export let lineDashArray = dashArray;
</script>

<AxisContainer {tickFormatter} {ticks} {side}>

  <g slot="ticks" let:ticks let:closestMargin let:farthestMargin>
    {#if showTicks}
      {#each ticks as tick, i (tick)}
        <AxisTick
          color={tickColor}
          alpha={tickAlpha}
          dashArray={tickDashArray}
          size={tickSize}
          placement={tick} />
        {#if lineStyle === 'long'}
          <AxisTick
            dashArray={tickDashArray}
            placement={tick}
            size={tickSize}
            tickDirection={-1}
            color={tickColor}
            alpha={tickAlpha}
            length={closestMargin - farthestMargin} />
        {/if}
      {/each}
    {/if}
  </g>

  <g slot="border">
    {#if showLine}
      <AxisLine
        color={lineColor}
        alpha={lineAlpha}
        size={lineSize}
        dashArray={lineDashArray} />
    {/if}
  </g>

  <g slot="labels" let:ticks let:tickFormatter>
    {#if showLabels}
      {#each ticks as tick, i}
        <AxisLabel
          {fontSize}
          color={labelColor}
          alpha={labelAlpha}
          placement={tick}>
          {tickFormatter ? tickFormatter(tick) : tick}
        </AxisLabel>
      {/each}
    {/if}
  </g>

</AxisContainer>
