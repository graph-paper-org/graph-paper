<script>
  import { writable } from "svelte/store"; // eslint-disable-line import/no-extraneous-dependencies
  import { getContext } from "svelte"; // eslint-disable-line import/no-extraneous-dependencies

  export let data;

  export let x = "x";
  export let y = "y";
  export let size = 2;
  let xScale = getContext("xScale") || writable((v) => v);
  let yScale = getContext("yScale") || writable((v) => v);

  let graphicWidth;
  let graphicHeight;

  getContext("graphicWidth").subscribe((w) => {
    graphicWidth = w;
  });
  getContext("graphicHeight").subscribe((h) => {
    graphicHeight = h;
  });

  let canvas;

  // organize by x, then by y?
  let ctx;

  $: if (canvas) ctx = canvas.getContext("2d");

  function renderCanvas(d, xs, ys) {
    ctx.clearRect(0, 0, graphicWidth, graphicHeight);
    ctx.fillStyle = "green";
    d.forEach((di) => {
      // ctx.moveTo(xs(di[x]), ys(di[y]));
      ctx.beginPath();
      ctx.arc(~~xs(di[x]), ~~ys(di[y]), size, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  }

  $: if (canvas && ctx) renderCanvas(data, $xScale, $yScale);
</script>

<g>
  <foreignObject width={graphicWidth} height={graphicHeight}>
    <canvas bind:this={canvas} width={graphicWidth} height={graphicHeight} />
  </foreignObject>
</g>
