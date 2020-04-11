// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from "@storybook/addon-knobs";

import __COMPONENT_NAME__ from "../__COMPONENT_NAME__.svelte";

export default {
  title: "__COMPONENT_NAME__",
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: __COMPONENT_NAME__,
  props: {},
});
