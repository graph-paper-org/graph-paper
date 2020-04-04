import {
  withKnobs, select, number, boolean,
} from '@storybook/addon-knobs';
import BasicPoint from './Points/Basic.svelte';

export default {
  title: 'Point',
  decorators: [withKnobs],
};

export const SinglePoint = () => ({
  Component: BasicPoint,
  props: {
    points: number('points', 100),
  },
});

// export const Line01 = () => ({
//   Component: Line01Story,
// });

// export const Line03 = () => ({
//   Component: Line03Story,
// });
