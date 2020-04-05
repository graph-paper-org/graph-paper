import {
  withKnobs, select, number, boolean,
} from '@storybook/addon-knobs';
import BasicLine from './Line/Basic.svelte';
import Line01Story from './Line/Line01.svelte';
import Line03Story from './Line/Line03.svelte';
import Line04Story from './Line/Line04.svelte';

export default {
  title: 'Line',
  decorators: [withKnobs],
};

export const Basic = () => ({
  Component: BasicLine,
  props: {
    points: number('points', 100),
    curve: select('curve', [
      'curveMonotoneX',
      'curveStep',
      'curveLinear',
      'curveNatural',
    ]),
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
    points: number('points', 100),
    curve: select('curve', [
      'curveMonotoneX',
      'curveStep',
      'curveLinear',
      'curveNatural',
    ]),
  },
});
