# Line

A line connects several points together to demonstrate a trend or path.

## Props for `<Line />`

- `data` (required)
- `x` (required, default `x`) – the accessor for the x orientation.
- `y` (required, d) – the accessor for the y orientation.
- `curve` (string, default `curveMonotoneX`) – the curve type from the the
  [`d3-shape` collection of curves](https://github.com/d3/d3-shape#curves).
- `size` (number, default `1`) – the thickness of the line.
- `color` (string, default `var(--digital-blue-500)`) - the color of the line.
- `alpha` (number, default `1`) – the opacity of the line.
- `dashArray` (string, default `1,0`) – the specification pattern for dashes and
  gaps in the line, following the
  [SVG `stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
  attribute.
- `area` / `areaColor` (`FIXME` these should be deprecated) defines the area
  under the curve.

### additional arguments

- `useXScale` / `useYScale` (default `true`) – if `false`, expect the value for
  given scale to either be in the range-space (that is, in terms of the svg
  pixels).
- `lineDrawAnimation` (`FIXME` this should be deprecated) the parameters that
  would be passed into `in:draw` for this line.

## Examples

See the `stories/Line` in this package for more examples.

Basic line chart:

```svelte
<script>
  import { randomNormal } from "d3-random";
  import DataGraphic from "../datagraphic";
  import { LeftAxis, BottomAxis } from "../guides";
  import { Line } from "../elements";

  const r = randomNormal(0, 20);
  let y = 100;
  const data = Array.from({ length: 100 }).map((_, i) => {
    y += r();
    return { x: i, y };
  });
</script>

<DataGraphic width={500} height={400}>
  <LeftAxis />
  <BottomAxis />
  <Line {data} />
</DataGraphic>
```

## Future Directions

- `lineDrawAnimation` should not be a prop. We should have a `transition` /
  `inTransition` / `outTransition` set of props that takes in a Svelte
  transition, as well as `transitionParams` / `inTransitionParams` /
  `outTransitionParams`. These all should be defined for all graphic elements
  where applicable.
- `area` / `areaColor` should be deprecated / implemented as their own elements.
