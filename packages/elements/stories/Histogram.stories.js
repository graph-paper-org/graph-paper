import { withKnobs, select, number } from "@storybook/addon-knobs";
import BasicHistogram from "./Histogram/Basic.svelte";

export default {
  title: "Histogram",
  decorators: [withKnobs],
};

export const Basic = () => ({
  Component: BasicHistogram,
  props: {
    bins: number("bins", 100),
    points: number("points", 500),
  },
});
