# Point

The point element maps two values to coordinates, represented by a symbol. A
collection of points is usually referred to as a _scatterplot_.

This package implements `<Point />`, which maps either:

1. a **single data point** with coordinates `x` and `y`, or
2. a **collection of points** with `data`, `x` (a string that accesses the x
   value) and `y` (a string that accesses the y value). For each element in
   `data`, plot each point.

## Arguments for `<Point />`

- `x` – either a value in the x domain (for a single point) or an accessor for
  the x domain (if `data` is specified, see below).
- `y` – either a value in the y domain (for a single point) or an accessor for
  the y domain (if `data` is specified, see below).
- `data` (optional) – the an array of objects representing a data set. If
  specified, `x` and `y` should be specified as accessors.
- `alpha` (optional, default 1, range [0, 1]) – the opacity of the overall
  point.
- `color` (optional, default `var(--digital-blue-500)`, css color string) – the
  fill color of the point.
- `colorAlpha` (optional, default 1, number [0, 1]) – the opacity of the fill
  color.
- `stroke` (optional, default `transparent`, color string) – the stroke color of
  the point.
- `strokeAlpha` (optional, default `0`, number [0, 1]) – the opacity of the
  stroke.
- `strokeWidth` (optional, default `0`, number) - the width of the point stroke.
- `shape` (`FIXME: implement`)

## Examples

See the `stories/Point` in this package for more examples.

Basic scatterplot:

```svelte
<script>
  import { randomNormal } from "d3-random";
  import DataGraphic from "@graph-paper/datagraphic";
  import { LeftAxis, BottomAxis } from "@graph-paper/guides";
  import { Point } from "../..";

  const r = randomNormal(50, 20);
  const data = Array.from({ length: 100 }).map(() => ({ x: r(), y: r() }));
</script>

<DataGraphic width={500} height={400}>
  <LeftAxis />
  <BottomAxis />
  <Point {data} />
</DataGraphic>
```

## Future Directions

- the other aesthetic arguments need to also allow for an accessor (for
  instance, `color` could map to a color scale for this layer)
- all accessors for any element should either be a string (pulls out value in
  the array of objects) or a function (allows the user to pull out a value any
  way they see fit)
