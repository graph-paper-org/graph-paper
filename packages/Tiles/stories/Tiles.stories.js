import TilesStory from './TilesStory.svelte';
import { withKnobs, number, select } from '@storybook/addon-knobs';

export default {
  title: 'Tiles',
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: TilesStory,
  props: {
    columns: number('columns', 3),
    space: select('space', [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 72, 81, 96])
  },
})
