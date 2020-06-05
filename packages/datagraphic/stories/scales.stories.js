import ScalePointStory from "./scales/ScalePoint.svelte";
import LogStory from "./scales/Log.svelte";

export default {
  title: "Scales",
};

export const ScalePoint = () => ({
  Component: ScalePointStory,
});

export const Log = () => ({
  Component: LogStory,
});
