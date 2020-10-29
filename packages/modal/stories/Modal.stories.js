// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from "@storybook/addon-knobs";

import ModalStory from "./ModalStory.svelte";

export default {
  title: "Modal",
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: ModalStory,
  props: {},
});
