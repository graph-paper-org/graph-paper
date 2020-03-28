<script>
import { getContext, onMount } from 'svelte';
import { writable } from 'svelte/store';
import { draw, fade } from 'svelte/transition';
import * as SHAPE from 'd3-shape';


export let xScale = getContext('xScale') || writable((v) => v);
export let yScale = getContext('yScale') || writable((v) => v);


export let xAccessor = 'x';
export let yAccessor = 'y';
export let useXScale = true;
export let useYScale = true;
export let data;
export let curve = 'curveMonotoneX';
const curveFunction = SHAPE[curve];
let lineGenerator;


let canvas;
let ctx;
let mounted = false;
let dpr = window.devicePixelRatio || 1;

function setupCanvas(c) {
  // Get the device pixel ratio, falling back to 1.
  // Get the size of the canvas in CSS pixels.
  let rect = c.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  const context = c.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  context.scale(dpr, dpr);
  return context;
}

function setDPI(canvas, dpi) {
  // Set up CSS size.
  canvas.style.width = canvas.style.width || `${canvas.width}px`;
  canvas.style.height = canvas.style.height || `${canvas.height}px`;

  // Get size information.
  let scaleFactor = dpi;
  let width = parseFloat(canvas.style.width);
  let height = parseFloat(canvas.style.height);

  // Backup the canvas contents.
  let oldScale = canvas.width / width;
  let backupScale = scaleFactor / oldScale;
  let backup = canvas.cloneNode(false);
  backup.getContext('2d').drawImage(canvas, 0, 0);

  // Resize the canvas.
  let ctx = canvas.getContext('2d');
  canvas.width = Math.ceil(width * scaleFactor);
  canvas.height = Math.ceil(height * scaleFactor);

  // Redraw the canvas image and scale future draws.
  ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
  ctx.drawImage(backup, 0, 0);
  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
  return ctx;
}

function renderCanvas() {
  ctx.clearRect(0, 0, graphicWidth, graphicHeight);
  lineGenerator.context(ctx)(data);
  ctx.stroke();
}

onMount(() => {
  ctx = setDPI(canvas, dpr);
  ctx.stroke();
  renderCanvas();
});

$: lineGenerator = SHAPE.line()
  .x((d) => (useXScale ? $xScale(d[xAccessor]) : d[xAccessor]))
  .y((d) => (useYScale ? $yScale(d[yAccessor]) : d[yAccessor]))
  .curve(curveFunction);

$: if (canvas && ctx && $xScale && $yScale) {
  // window.requestAnimationFrame(renderCanvas);
  renderCanvas();
}

let graphicWidth;
let graphicHeight;

getContext('graphicWidth').subscribe((w) => { graphicWidth = w; });
getContext('graphicHeight').subscribe((h) => { graphicHeight = h; });

</script>

<g class=line>
    <foreignObject width={graphicWidth} height={graphicHeight}>
        <canvas bind:this={canvas} width={graphicWidth} height={graphicHeight} />
    </foreignObject>
</g>