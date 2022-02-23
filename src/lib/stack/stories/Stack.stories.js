// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, select } from "@storybook/addon-knobs";
import StackStory from "./StackStory.svelte";
import ColorPaletteStory from "./ColorPalette.svelte";

export default {
  title: "Stack",
  decorators: [withKnobs],
};

const controls = () => ({
  space: select(
    "space",
    [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 72, 81, 96]
  ),
  justifyItems: select("justify items", [
    "auto",
    "normal",
    "stretch",
    "center",
    "start",
    "end",
  ]),
  justifyContent: select("justify content", [
    "stretch",
    "start",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "left",
    "right",
  ]),
  alignItems: select("align items", [
    "normal",
    "stretch",
    "center",
    "start",
    "end",
  ]),
  alignContent: select("align content", [
    "stretch",
    "center",
    "start",
    "end",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
});

export const Default = () => ({
  Component: StackStory,
  props: controls(),
});

export const ColorPalette = () => ({
  Component: ColorPaletteStory,
});
