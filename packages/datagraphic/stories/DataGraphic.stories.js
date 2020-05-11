// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from "@storybook/addon-knobs";
import Borders from "./Borders.svelte";

import LayersStory from "./Layers.svelte";

export default {
  title: "DataGraphic",
  decorators: [withKnobs],
};

export const Layers = () => ({ Component: LayersStory });

export const borders = () => ({
  Component: Borders,
});
