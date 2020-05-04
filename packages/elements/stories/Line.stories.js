// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, select, number, text } from "@storybook/addon-knobs";
import BasicLine from "./Line/Basic.svelte";
import Line01Story from "./Line/Line01.svelte";
import Line03Story from "./Line/Line03.svelte";
import Line04Story from "./Line/Line04.svelte";
import Line05Story from "./Line/Line05.svelte";
import Line06Story from "./Line/Line06.svelte";

export default {
  title: "Line",
  decorators: [withKnobs],
};

export const Basic = () => ({
  Component: BasicLine,
  props: {
    points: number("points", 100),
    size: number("size", 1),
    curve: select("curve", [
      "curveMonotoneX",
      "curveStep",
      "curveLinear",
      "curveNatural",
    ]),
    dashArray: text("dashArray", "1,0"),
  },
});

export const Line01 = () => ({
  Component: Line01Story,
});

export const Line03 = () => ({
  Component: Line03Story,
});

export const Line04 = () => ({
  Component: Line04Story,
  props: {
    points: number("points", 100),
    curve: select("curve", [
      "curveMonotoneX",
      "curveStep",
      "curveLinear",
      "curveNatural",
    ]),
  },
});

export const Line05 = () => ({
  Component: Line05Story,
  props: {
    title: "A Standard Line Graph",
    supertitle: "Over Time",
    description: "The lines go up and down like a mountain!",
  },
});

export const Line06 = () => ({
  Component: Line06Story,
});
