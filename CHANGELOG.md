# Changelog

## unreleased

- Refactor width / height of `DataGraphic` component to reactively update ([#83](https://github.com/graph-paper-org/graph-paper/pull/82))

## 0.0.0-alpha.8

Published `2020-05-01`

- Fix bug where dates do not get properly set in extents ([#75](https://github.com/graph-paper-org/graph-paper/pull/75))
- Move `hideClickOnOutside` listener from `@graph-paper/optionmenu` to `@graph-paper/core/utils` ([#70](https://github.com/graph-paper-org/graph-paper/pull/70))
- Add a number of new icons to `@graph-paper/icons`, including new `Checkbox` icons, `Add` icons, `Remove` icons, `Sequence`, `More` icons and so on ([#65](https://github.com/graph-paper-org/graph-paper/pull/65))
- Add a new prop, `color` to all icons, which defaults to the css value `currentColor` (as before) ([#65](https://github.com/graph-paper-org/graph-paper/pull/65))

## 0.0.0-alpha.7

Published `2020-04-25`

- Add `Checkbox`, `CheckboxBlank`, `CheckboxBlankDark` to `@graph-paper/icons` ([#64](https://github.com/graph-paper-org/graph-paper/pull/64))
- `Button` component now accept `href` ([#59](https://github.com/graph-paper-org/graph-paper/pull/59))
- Add `@graph-paper/portal` ([#55](https://github.com/graph-paper-org/graph-paper/pull/55/))
- Add `@graph-paper/optionmenu` ([#19](https://github.com/graph-paper-org/graph-paper/pull/19/))
- Standardizes `Line` component
- Change `LineBand` -> `Band`
- Add `@graph-paper/icons`
- Add `@graph-paper/chip`

## 0.0.0-alpha.6

- Add WIP histogram implementation + stories
- Data graphic now automatically calculates extents for some elements (line, histogram, point)
- Standardizes the point element arguments and implementation to include one point or many
- Add new stories for points in elements package
- Add option to not allow auto-scaling for an element (implemented for points)
- Add new story `elements/stories/Line/Line04.svelte`
