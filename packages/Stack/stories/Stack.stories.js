import StackStory from './StackStory.svelte';
import { withKnobs, select } from '@storybook/addon-knobs';
export default {
    title: 'Stack',
    decorators: [withKnobs],
  };

export const Default = () => ({
  Component: StackStory,
  props: {
    space: select('space', [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 72, 81, 96])
  }
})

