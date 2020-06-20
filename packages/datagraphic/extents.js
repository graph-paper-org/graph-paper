import { extent, min, max } from "d3-array";
// eslint-disable-next-line import/no-extraneous-dependencies
import { get } from "svelte/store";
/*
extents
-------

These functions operate on svelte stores or store values.

*/

export function updateExtents(store, key, data, accessor = undefined) {
  if (!data) throw Error("data is required");
  let dArray = data;
  const isArrayOfObjects = typeof data[0] === "object" && data[0] !== null;
  if (isArrayOfObjects) {
    if (!accessor) {
      throw Error("cannot pass in array of objects w/o an accessor");
    }
    dArray = data.map((di) => di[accessor]);
  }
  if (!("set" in store && "subscribe" in store && "update" in store)) {
    throw Error(
      "must pass in a svelte store w/ a subscribe, update, and set method"
    );
  }

  const [minValue, maxValue] = extent(dArray);

  const currentValues = get(store)[key];
  let currentMin;
  let currentMax;
  if (currentValues) {
    currentMin = currentValues.min;
    currentMax = currentValues.max;
  }

  if (!currentValues || (currentMin !== minValue && currentMax !== maxValue))
    store.update((storeValue) => {
      if (!(typeof storeValue === "object" && storeValue !== null)) {
        throw Error("store value must be an object");
      }
      storeValue[key] = { max: maxValue, min: minValue }; // eslint-disable-line
      return storeValue;
    });
}

export function removeExtent(store, k) {
  store.update((storeValue) => {
    if (!(k in storeValue)) throw Error("key not in extents");
    // eslint-disable-next-line no-param-reassign
    delete storeValue[k];
    return storeValue;
  });
}

export function getDomainFromExtents(storeValue) {
  return [
    min([...Object.values(storeValue).map((b) => b.min)]),
    max([...Object.values(storeValue).map((b) => b.max)]),
  ];
}
