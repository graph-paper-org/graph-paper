import { extent, min, max } from "d3-array";
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
  store.update((storeValue) => {
    if (!(typeof storeValue === "object" && storeValue !== null)) {
      throw Error("store value must be an object");
    }
    const [min, max] = extent(dArray);
    return {
      ...storeValue,
      [key]: { max, min },
    };
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
  const vMin = min([...Object.values(storeValue).map((b) => b.min), Infinity]);
  const vMax = max([...Object.values(storeValue).map((b) => b.max), -Infinity]);
  return [vMin, vMax];
}
