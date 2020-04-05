import {
  withKnobs, select, number, boolean, text,
} from '@storybook/addon-knobs';
import BasicPoint from './Points/Basic.svelte';
import PointsExtentsStory from './Points/PointsExtents.svelte';
import PointCloud01Story from './Points/PointCloud01.svelte';

export default {
  title: 'Point',
  decorators: [withKnobs],
};

export const SinglePoint = () => ({
  Component: BasicPoint,
  props: {
    size: number('size', 3),
    alpha: number('alpha', 1),
    color: text('color', 'red'),
    colorAlpha: number('colorAlpha', 1),
    stroke: text('stroke', 'transparent'),
    strokeAlpha: number('strokeAlpha', 0),
    strokeWidth: number('strokeWidth', 1),
  },
});

export const PointsExtent = () => ({
  Component: PointsExtentsStory,
  props: {
    size: number('size', 3),
    alpha: number('alpha', 1),
    color: text('color', 'red'),
    colorAlpha: number('colorAlpha', 1),
    stroke: text('stroke', 'transparent'),
    strokeAlpha: number('strokeAlpha', 0),
    strokeWidth: number('strokeWidth', 1),
  },
});

export const PointCloud01 = () => ({
  Component: PointCloud01Story,
});
