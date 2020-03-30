import { writable, get } from 'svelte/store';
import { updateExtents, removeExtent, getDomainFromExtents } from '../extents';
import { data01 } from './data';


describe('updateExtents', () => {
  it('rejects when parameters are missing', () => {
    const validExtents = writable({});
    const invalidExtents = writable(0);
    expect(() => updateExtents()).toThrow();
    expect(() => updateExtents(undefined, 'test', data01)).toThrow();
    expect(() => updateExtents(undefined, 'test', data01, 'x')).toThrow();
    expect(() => updateExtents(validExtents, 'test', data01)).toThrow();
    expect(() => updateExtents(invalidExtents, 'test', data01, 'x')).toThrow();
  });
  it('updates the extents when an array of objects is passed in as data', () => {
    const extents = writable({});
    updateExtents(extents, 'test01', data01, 'x');
    expect(get(extents)).toEqual({
      test01: { max: 15, min: -12 },
    });
  });
  it('updates the extents when an array of numbers is passed in', () => {
    const extents = writable({});
    updateExtents(extents, 'test01', data01.map((di) => di.x));
    expect(get(extents)).toEqual({
      test01: { max: 15, min: -12 },
    });
  });
});

describe('removeExtent', () => {
  it('throws when bad', () => {
    const extents = writable({});
    updateExtents(extents, 'test1', data01, 'x');
    expect(() => removeExtent(extents, 'broken')).toThrow();
  });
  it('removes extent', () => {
    const extents = writable({});
    updateExtents(extents, 'test1', data01, 'x');
    updateExtents(extents, 'test2', data01, 'y');
    removeExtent(extents, 'test1');
    expect(get(extents)).toEqual({
      test2: { max: 200, min: -10 },
    });
  });
});

describe('getDomainFromExtents', () => {
  it('gets domain from extents', () => {
    const extents = writable({});
    updateExtents(extents, 'test1', data01, 'x');
    updateExtents(extents, 'test2', data01, 'y');
    expect(getDomainFromExtents(get(extents))).toEqual([-12, 200]);
  });
});
