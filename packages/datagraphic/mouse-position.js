import { range, bisect } from "d3-array";

export function toSVGPixelCoordinates(x, y, svgElement) {
  const pt = svgElement.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
  return [svgP.x, svgP.y];
}

export function inBody(x, y, { left, right, top, bottom }) {
  return x > left && x < right && y > top && y < bottom;
}

function scaleCategorical(scale, pixelCoordinate, orientation = "x") {
  const scaleRange = scale.range();
  const scaleDomain = scale.domain();
  // correct for vertical orientation.
  if (orientation === "y") {
    scaleDomain.reverse();
    scaleRange.reverse();
  }

  const rangeValues = range(scaleRange[0], scaleRange[1], scale.step());
  return scaleDomain[bisect(rangeValues, pixelCoordinate) - 1];
}

export const invertPositionalScale = {
  linear: (scale, pixelCoordinate) => scale.invert(pixelCoordinate),
  time: (scale, pixelCoordinate) => scale.invert(pixelCoordinate),
  scalePoint: scaleCategorical,
  scaleBand: scaleCategorical,
};

export const defaultMousePosition = () => ({
  x: undefined,
  y: undefined,
  px: undefined,
  py: undefined,
});

export function getMousePosition(
  event,
  svg,
  { xScale, yScale, left, right, bottom, top }
) {
  if (!svg) return undefined;
  const { clientX, clientY } = event;
  // get the range (pixel values) of mouse movement.
  const [actualX, actualY] = toSVGPixelCoordinates(clientX, clientY, svg);
  const bodyBounds = {
    left,
    right,
    top,
    bottom,
  };
  const body = inBody(actualX, actualY, bodyBounds);
  return {
    x: invertPositionalScale[xScale.type](xScale, actualX, "x"),
    y: invertPositionalScale[yScale.type](yScale, actualY, "y"),
    px: actualX,
    py: actualY,
    body,
  };
}
