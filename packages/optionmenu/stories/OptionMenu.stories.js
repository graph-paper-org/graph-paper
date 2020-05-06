// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

import { OptionMenu } from "..";
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
  Component: OptionMenu,
  props: {
    options: [
      {
        key: "win",
        label: "Windows",
      },
      {
        key: "mac",
        label: "Mac",
        description: "Not including versions before Mac OS X",
      },
      {
        key: "linux",
        label: "Linux",
        description: "Not currently collecting data",
        disabled: true,
      },
      { key: "DIVIDER" },
      {
        key: "mobile",
        label: "Mobile",
        description: "All mobile operating systems",
      },
    ],
    currentOption: { key: "win", label: "Windows" },
    ...knobs({
      title: "Operating System",
      description: "Filter by operating system",
    }),
  },
});

export const Multi = () => ({
  Component: OptionMenu,
  props: {
    options: [
      {
        key: "win",
        label: "Windows",
      },
      {
        key: "mac",
        label: "Mac",
        description: "Not including versions before Mac OS X",
      },
      {
        key: "linux",
        label: "Linux",
        description: "Not currently collecting data",
        disabled: true,
      },
      { key: "DIVIDER" },
      {
        key: "mobile",
        label: "Mobile",
        description: "All mobile operating systems",
      },
    ],
    multi: true,
    currentOption: [{ key: "win", label: "Windows" }],
    ...knobs({
      title: "Multi Options",
      description: "Filter by operating system",
    }),
  },
});

export const SideBySide = () => ({
  Component: SideBySideStory,
});
