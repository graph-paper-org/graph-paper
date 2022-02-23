// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

import DefaultStory from "./DefaultStory.svelte";
import MultiStory from "./MultiStory.svelte";
import SideBySideStory from "./SideBySideStory.svelte";

export default {
  title: "Option Menu",
  decorators: [withKnobs],
};

const alignmentOptions = {
  Left: "left",
  Right: "right",
  Center: "center",
  Top: "top",
  Bottom: "bottom",
};

const locationOptions = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
};

function knobs({ title = "Options", description = "Description" }) {
  return {
    title: text("title (or empty)", title),
    description: text("description", description),
    alignment: select("alignment", alignmentOptions, alignmentOptions.Center),
    location: select("location", locationOptions, locationOptions.Bottom),
    showTooltip: boolean("showTooltip", true),
    compact: boolean("compact", false),
  };
}

export const Default = () => ({
  Component: DefaultStory,
  props: {
    knobProps: {
      ...knobs({
        title: "Default Options",
        description: "Filter by operating system",
      }),
    },
  },
});

export const Multi = () => ({
  Component: MultiStory,
  props: {
    knobProps: {
      ...knobs({
        title: "Multi Options",
        description: "Filter by operating system",
      }),
    },
  },
});

export const SideBySide = () => ({
  Component: SideBySideStory,
});
