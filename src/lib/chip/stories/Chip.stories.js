// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from "@storybook/addon-knobs";
import ChipStory01 from "./Chip01.svelte";

export default {
  title: "Chip",
  decorators: [withKnobs],
};

export const Chip01 = () => ({
  Component: ChipStory01,
  props: {},
});
