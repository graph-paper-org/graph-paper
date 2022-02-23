// eslint-disable-next-line import/no-extraneous-dependencies
import { select, boolean } from "@storybook/addon-knobs";

const levelOptions = ["low", "medium", "high"];

export default (defaults = {}) => ({
  level: select(
    "level",
    defaults.levelOptions || levelOptions,
    defaults.level || "high"
  ),
  compact: boolean("compact", false),
});
