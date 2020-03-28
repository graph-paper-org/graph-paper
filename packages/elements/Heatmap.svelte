<script>
import { writable } from 'svelte/store'; // eslint-disable-line import/no-extraneous-dependencies
import { getContext, onMount } from 'svelte'; // eslint-disable-line import/no-extraneous-dependencies
import { fade } from 'svelte/transition'; // eslint-disable-line import/no-extraneous-dependencies
import { cubicOut as easing } from 'svelte/easing'; // eslint-disable-line import/no-extraneous-dependencies
import { interpolateRdPu } from 'd3-scale-chromatic';
import { scaleLog, scaleLinear } from 'd3-scale';

export let data;

export let xAccessor = 'x';
export let yAccessor = 'y';
export let heatAccessor = 'heat';
export let scaleType = 'log';
export let xScale = getContext('xScale') || writable((v) => v);
export let yScale = getContext('yScale') || writable((v) => v);
export let heatRange = [0.3, 0.8];
export let opacity = 1;
export let transition = { duration: 200, easing };
export let hidden = false;
export let colorMap = interpolateRdPu;

let graphicWidth;
let graphicHeight;

getContext('graphicWidth').subscribe((w) => { graphicWidth = w; });
getContext('graphicHeight').subscribe((h) => { graphicHeight = h; });

const scaleFunction = scaleType === 'linear' ? scaleLinear : scaleLog;

const heatValues = data.map((d) => d[heatAccessor]);
const heatCorrection = scaleType === 'linear' ? 0 : 1;

const scale = scaleFunction()
  .domain([
    Math.min(...heatValues) + heatCorrection,
    Math.max(...heatValues) + heatCorrection])
  .range(heatRange);

let canvas;

// organize by x, then by y?

function getLengths(ds, sc, accessor) {
  const points = Array.from(new Set(ds.map((d) => d[accessor])));
  points.sort((a, b) => (a > b ? 1 : -1));
  // what do I need? for each x value, I need xVal: length.
  // from there, we should be able to map xVal to relevant width
  return points.reduce((acc, v, i) => {
    acc[v] = 0; // eslint-disable-line
    if (i < points.length - 1) {
      acc[v] = sc(points[i + 1]) - sc(v); // eslint-disable-line
    }
    return acc;
  }, {});
}

let widths = getLengths(data, $xScale, xAccessor);
let heights = getLengths(data, $yScale, yAccessor);

let byColor = data.map((d, i) => ({
  [heatAccessor]: d[heatAccessor] === 0.0 ? 'transparent' : colorMap(scale(d[heatAccessor])),
  [xAccessor]: $xScale(d[xAccessor]),
  [yAccessor]: $yScale(d[yAccessor]) - $yScale.step() / 2,
  width: widths[d[xAccessor]],
  height: heights[d[yAccessor]],
}));
  // try to not change the fillStyle and strokeStyle too much.
  // the canvas state machine can be VERY slow otherwise.
const colors = new Set(byColor.map((b) => b[heatAccessor]));

const colorCombos = Array.from(colors).reduce((acc, c) => {
  acc[c] = byColor.filter((bc) => bc[heatAccessor] === c);
  return acc;
}, {});

function renderCanvas() {
  const ctx = canvas.getContext('2d');
  // let w = $xScale.step();
  // let h = $yScale.step();
  colors.forEach((c) => {
    // let theseColors = byColor.filter((bc) => bc[heatAccessor] === c);
    let theseColors = colorCombos[c];
    ctx.fillStyle = c;
    ctx.strokeStyle = c;
    theseColors.forEach((d) => {
      const w = d.width;
      const h = d.height;
      ctx.fillRect(d[xAccessor], d[yAccessor], w, h);
      ctx.strokeRect(d[xAccessor], d[yAccessor], w, h);
    });
  });
}

onMount(() => {
  renderCanvas();
});

$: if ((!hidden) && canvas) renderCanvas();

</script>

{#if !hidden}
  <g transition:fade={transition} {opacity}>
    <foreignObject width={graphicWidth} height={graphicHeight}>
      <canvas bind:this={canvas} width={graphicWidth} height={graphicHeight}  />
    </foreignObject>
  </g>
{/if}