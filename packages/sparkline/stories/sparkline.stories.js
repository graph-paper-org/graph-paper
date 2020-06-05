// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from "@storybook/addon-knobs";

import Sparkline from "../Sparkline.svelte";

export default {
  title: "sparkline",
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: Sparkline,
  props: {},
});
