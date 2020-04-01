import __COMPONENT_NAME__ from "../__COMPONENT_NAME__.svelte";
import { withKnobs } from "@storybook/addon-knobs";
export default {
  title: "__COMPONENT_NAME__",
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: __COMPONENT_NAME__,
  props: {},
});
