// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from "@storybook/addon-knobs";
import Borders from "./Borders.svelte";
import MarginsStory from "./Margins.svelte";
import LayersStory from "./Layers.svelte";
import SizeStory from "./WidthAndHeight.svelte";

export default {
  title: "DataGraphic",
  decorators: [withKnobs],
};

export const Layers = () => ({ Component: LayersStory });

export const borders = () => ({
  Component: Borders,
});

export const Margins = () => ({
  Component: MarginsStory,
});

export const WidthAndHeight = () => ({
  Component: SizeStory,
});
