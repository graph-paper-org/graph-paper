// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, number, color } from "@storybook/addon-knobs";
import AllIconsStory from "./AllIcons.svelte";

export default {
  title: "Icon",
  decorators: [withKnobs],
};

export const AllIcons = () => ({
  Component: AllIconsStory,
  props: {
    size: number("size", 24),
    color: color("color", "#000"),
  },
});
