# Changelog

## unreeleased

- Re-implement the `Stack` component to use owl selectors instead of
  `grid-column-gap`
  ([#56](https://github.com/graph-paper-org/graph-paper/pull/56))

## 0.0.0-alpha.14

Published `2020-06-29`

- Add new offset props `dx` and `dy` to `AxisLabel.svelte`
  ([#45](https://github.com/graph-paper-org/graph-paper/pull/45))
- Fix bug with infinite loops involving extents and updated data
  ([#33](https://github.com/graph-paper-org/graph-paper/pull/33))
- Fix performance issues in `Layer.svelte` story related to blur filters
  ([#31](https://github.com/graph-paper-org/graph-paper/pull/31))
- Fix a couple of remaining vertical-centering issues the `Option` component

## 0.0.0-alpha.13

Published `2020-06-05`

- Vertically-center `Option` contents
- Add new real-world example – approval poll from 538
  (([#140](https://github.com/graph-paper-org/graph-paper/pull/140)))
- Add `AxisContainer` to exports in `@graph-paper/guide`
  (([#140](https://github.com/graph-paper-org/graph-paper/pull/140)))
- Remove `mix-blend-mode` in `Band.svelte` for performance reasons
  (([#140](https://github.com/graph-paper-org/graph-paper/pull/140)))
- Move to `crispEdges` for all svg lines
  (([#140](https://github.com/graph-paper-org/graph-paper/pull/140)))
- Fix lack of inversion function for log scales in `mouse-position.js`
  ([#154](https://github.com/graph-paper-org/graph-paper/pull/154))

## 0.0.0-alpha.12

- Add align / justify props to `Stack`
  ([#134](https://github.com/graph-paper-org/graph-paper/pull/134))
- Add align / justify props to `Tile`
  ([#131](https://github.com/graph-paper-org/graph-paper/pull/131))

## 0.0.0-alpha.11

Published `2020-05-20`

- Fix issue where width and height not updating reactively in `DataGraphic`
  ([#113](https://github.com/graph-paper-org/graph-paper/pull/113))
- Refactor axis components to support more props & reactivity
  ([#109](https://github.com/graph-paper-org/graph-paper/pull/109))

## 0.0.0-alpha.10

Published `2020-05-15`

- Update the `<OptionMenu>` component to require `<Option>` components in its
  slot, each of which can accept a "right" slot for styling (Note: API change)
  ([#93](https://github.com/graph-paper-org/graph-paper/pull/93))
- Refactor data graphic margin calculations to be reactive
  ([#106](https://github.com/graph-paper-org/graph-paper/pull/106))

## 0.0.0-alpha.9

Published `2020-05-12`

- Change `xDomainMin` / `xDomainMax` & y equivalents to `xMin` / `xMax` etc.
  ([#95](https://github.com/graph-paper-org/graph-paper/pull/95))
- Refactor width / height of `DataGraphic` component to reactively update
  ([#83](https://github.com/graph-paper-org/graph-paper/pull/82))
- Change `borderThickness` to `borderSize` in `DataGraphic`
  ([#96](https://github.com/graph-paper-org/graph-paper/pull/96))
- Refactor mouse position calculations
  ([#98](https://github.com/graph-paper-org/graph-paper/pull/98))
- Rename `hoverValue` to `mousePosition` in `DataGraphic` and throughout all
  code examples ([#98](https://github.com/graph-paper-org/graph-paper/pull/98))
- Change `mouseover` slot in `DataGraphic` to `interaction`
  ([#102](https://github.com/graph-paper-org/graph-paper/pull/102))
- Move `annotation` slot in `DataGraphic` to be on top
  ([#102](https://github.com/graph-paper-org/graph-paper/pull/102))
- Add `Layers.svelte` story
  ([#102](https://github.com/graph-paper-org/graph-paper/pull/102))

## 0.0.0-alpha.8

Published `2020-05-01`

- Fix bug where dates do not get properly set in extents
  ([#75](https://github.com/graph-paper-org/graph-paper/pull/75))
- Move `hideClickOnOutside` listener from `@graph-paper/optionmenu` to
  `@graph-paper/core/utils`
  ([#70](https://github.com/graph-paper-org/graph-paper/pull/70))
- Add a number of new icons to `@graph-paper/icons`, including new `Checkbox`
  icons, `Add` icons, `Remove` icons, `Sequence`, `More` icons and so on
  ([#65](https://github.com/graph-paper-org/graph-paper/pull/65))
- Add a new prop, `color` to all icons, which defaults to the css value
  `currentColor` (as before)
  ([#65](https://github.com/graph-paper-org/graph-paper/pull/65))

## 0.0.0-alpha.7

Published `2020-04-25`

- Add `Checkbox`, `CheckboxBlank`, `CheckboxBlankDark` to `@graph-paper/icons`
  ([#64](https://github.com/graph-paper-org/graph-paper/pull/64))
- `Button` component now accept `href`
  ([#59](https://github.com/graph-paper-org/graph-paper/pull/59))
- Add `@graph-paper/portal`
  ([#55](https://github.com/graph-paper-org/graph-paper/pull/55/))
- Add `@graph-paper/optionmenu`
  ([#19](https://github.com/graph-paper-org/graph-paper/pull/19/))
- Standardizes `Line` component
- Change `LineBand` -> `Band`
- Add `@graph-paper/icons`
- Add `@graph-paper/chip`

## 0.0.0-alpha.6

- Add WIP histogram implementation + stories
- Data graphic now automatically calculates extents for some elements (line,
  histogram, point)
- Standardizes the point element arguments and implementation to include one
  point or many
- Add new stories for points in elements package
- Add option to not allow auto-scaling for an element (implemented for points)
- Add new story `elements/stories/Line/Line04.svelte`
