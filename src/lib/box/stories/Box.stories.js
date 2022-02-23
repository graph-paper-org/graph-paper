// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, select } from "@storybook/addon-knobs";
import Box from "./BoxStory.svelte";

export default {
  title: "Box",
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: Box,
  props: {
    padding: select(
      "padding [shown in red]",
      [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 72, 81, 96]
    ),
  },
});
