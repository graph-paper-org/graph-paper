<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { getContext } from "svelte";
  import Springable from "./Springable.svelte";
  import { Point } from "../..";

  export let point = [];

  export let formatValue = (v) => v;
  export let xOffset = 0;
  export let fontSize = 14;
  export let xBuffer = 8;
  export let yBuffer = 3;
  export let outlineColor = "white";
  export let alignLabels = true;
  export let showPoints = true;
  export let showLabels = true;

  // plot the middle and push out from there

  const xScale = getContext("xScale");
  const yScale = getContext("yScale");
  const leftPlot = getContext("leftPlot");
  const rightPlot = getContext("rightPlot");
  const topPlot = getContext("topPlot");
  const bottomPlot = getContext("bottomPlot");

  function toLocations(pt, xs, ys, left, right, top, bottom) {
    // this is where the boundary condition lives.
    let locations = [
      ...pt.map((p) => ({
        ...p,
        xRange: Math.max(left, xs(p.x)) || 0,
        yRange: ys(p.y),
      })),
    ];
    // sort order makes all the difference here
    locations.sort((a, b) => {
      if (a.y < b.y) return 1;
      if (a.y > b.y) return -1;
      return 0;
    });
    if (locations.length === 1) {
      locations[0].yRange = Math.min(
        bottom,
        Math.max(top, locations[0].yRange)
      );
      return locations;
    }
    if (!locations.length) return locations;

    const middle = ~~(locations.length / 2); // eslint-disable-line

    // STEP 1: inside up to top label.
    let i = middle;
    while (i >= 0) {
      if (i !== middle) {
        const diff = locations[i + 1].yRange - locations[i].yRange;
        if (diff <= fontSize + yBuffer) {
          locations[i].yRange -= fontSize + yBuffer - diff;
        }
      }
      i -= 1;
    }

    // STEP 2: top label shuffle down to reasonable place, shift to middle.
    if (locations[0].yRange < top + yBuffer) {
      locations[0].yRange = top + yBuffer;
      i = 0;
      while (i < middle) {
        const diff = locations[i + 1].yRange - locations[i].yRange;
        if (diff <= fontSize + yBuffer) {
          locations[i + 1].yRange += fontSize + yBuffer - diff;
        }
        i += 1;
      }
    }

    // STEP 3: inside down to bottom label;
    i = middle;
    while (i < locations.length) {
      if (i !== middle) {
        const diff = locations[i].yRange - locations[i - 1].yRange;
        if (diff < fontSize + yBuffer) {
          locations[i].yRange += fontSize + yBuffer - diff;
        }
      }
      i += 1;
    }
    if (locations[locations.length - 1].yRange > bottom - yBuffer) {
      locations[locations.length - 1].yRange = bottom - yBuffer;
      i = locations.length - 1;
      while (i > 0) {
        const diff = locations[i].yRange - locations[i - 1].yRange;
        if (diff <= fontSize + yBuffer) {
          locations[i - 1].yRange -= fontSize + yBuffer - diff;
        }
        i -= 1;
      }
    }
    return locations;
  }

  let locations = toLocations(
    point,
    $xScale,
    $yScale,
    $leftPlot,
    $rightPlot,
    $topPlot,
    $bottomPlot
  );
  $: locations = toLocations(
    point,
    $xScale,
    $yScale,
    $leftPlot,
    $rightPlot,
    $topPlot,
    $bottomPlot
  );
  let container;
  let labelWidth = 0;

  $: if (container && locations && $xScale && $yScale) {
    labelWidth = Math.max(
      ...Array.from(container.querySelectorAll(".widths")).map(
        (q) => q.getBoundingClientRect().width
      )
    );
    if (!Number.isFinite(labelWidth)) {
      labelWidth = 0;
    }
  }
</script>

<filter id="outliner">
  <feMorphology
    operator="dilate"
    radius="2"
    in="SourceGraphic"
    result="THICKNESS"
  />
  <feComposite operator="out" in="THICKNESS" in2="SourceGraphic" />
</filter>

<g bind:this={container}>
  {#if showLabels}
    {#each locations as location, i (location.label)}
      <Springable
        value={{
          y: location.yRange || 0,
          x:
            location.xRange +
            xBuffer +
            xOffset +
            (alignLabels ? labelWidth : 0),
        }}
        let:springValue={v}
        params={{ damping: 0.9, stiffness: 0.4 }}
      >
        <text
          filter="url(#outliner)"
          fill={outlineColor}
          data-location={location.yRange}
          font-size={fontSize}
        >
          <tspan
            dy=".35em"
            class="widths"
            y={v.y}
            style="font-weight: bold;"
            text-anchor="end"
            x={v.x}
          >
            {formatValue(location.y)}
          </tspan>
          <tspan dy=".35em" y={v.y} x={v.x}>{location.label}</tspan>
        </text>
        <text font-size={fontSize}>
          <tspan
            fill={location.color}
            dy=".35em"
            style="font-weight: bold;"
            class="widths"
            y={v.y}
            text-anchor="end"
            x={v.x}
          >
            {formatValue(location.y)}
          </tspan>
          <tspan dy=".35em" y={v.y} x={v.x} class="mc-mouseover-label">
            {location.label}
          </tspan>
        </text>
      </Springable>
    {/each}
  {/if}
  {#if showPoints}
    {#each locations as { x, y, color, label }, i (label)}
      <Point scaling={false} {x} {y} {color} size={3} />
    {/each}
  {/if}
</g>

<style>
  .mc-mouseover-label {
    cursor: pointer;
    transition: fill 200ms;
    fill: var(--cool-gray-650);
  }

  .mc-mouseover-label:hover {
    fill: var(--cool-gray-800);
  }
</style>
