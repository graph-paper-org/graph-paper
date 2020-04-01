// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, get } from "svelte/store";
import { updateExtents, removeExtent, getDomainFromExtents } from "../extents";
import { data01, data02 } from "./data";

describe("updateExtents", () => {
  const extentsStore = writable({});
  const output01 = {
    test01: { max: 15, min: -12 },
  };
  const output02 = {
    ...output01,
    test02: { max: 30, min: 0 },
  };
  const output03 = {
    ...output02,
    test03: { max: 30, min: 0 },
  };

  it("rejects when parameters are missing", () => {
    const validExtents = writable({});
    const invalidExtents = writable(0);
    expect(() => updateExtents()).toThrow();
    expect(() => updateExtents(undefined, "test", data01)).toThrow();
    expect(() => updateExtents(undefined, "test", data01, "x")).toThrow();
    expect(() => updateExtents(validExtents, "test", data01)).toThrow();
    expect(() => updateExtents(invalidExtents, "test", data01, "x")).toThrow();
  });

  it("identifies the extents with one data point", () => {
    updateExtents(extentsStore, "test01", data01, "x");
    expect(get(extentsStore)).toEqual(output01);
  });

  it("updates the extents with an additional data point", () => {
    updateExtents(extentsStore, "test02", data02, "x");
    expect(get(extentsStore)).toEqual(output02);
  });

  it("updates the extents with data that contains null and undefined", () => {
    updateExtents(extentsStore, "test03", data02, "y");
    expect(get(extentsStore)).toEqual(output03);
  });
});

describe("removeExtent", () => {
  it("throws on incorrect arguments", () => {
    const extentsStore = writable({});
    updateExtents(extentsStore, "test1", data01, "x");
    expect(() => removeExtent(extentsStore, "broken")).toThrow();
    expect(() => removeExtent(undefined)).toThrow();
    expect(() => removeExtent([1, 2, 3, 4, 5], "test1")).toThrow();
  });

  it("removes extents", () => {
    const extentsStore = writable({});
    updateExtents(extentsStore, "test1", data01, "x");
    updateExtents(extentsStore, "test2", data01, "y");
    removeExtent(extentsStore, "test1");
    expect(get(extentsStore)).toEqual({
      test2: { max: 200, min: -10 },
    });
  });

  it("removes the last extent and leaves an empty object", () => {
    const extentsStore = writable({});
    updateExtents(extentsStore, "test1", data01, "x");
    updateExtents(extentsStore, "test2", data01, "y");
    removeExtent(extentsStore, "test1");
    removeExtent(extentsStore, "test2");
    expect(get(extentsStore)).toEqual({});
  });
});

describe("getDomainFromExtents", () => {
  it("gets domain from extents", () => {
    const extentsStore = writable({});
    updateExtents(extentsStore, "test1", data01, "x");
    updateExtents(extentsStore, "test2", data01, "y");
    expect(getDomainFromExtents(get(extentsStore))).toEqual([-12, 200]);
  });
  it("updates the domain if an extent is removed, ()", () => {
    const extentsStore = writable({});
    updateExtents(extentsStore, "test1", data01, "x");
    updateExtents(extentsStore, "test2", data01, "y");
    expect(getDomainFromExtents(get(extentsStore))).toEqual([-12, 200]);
    removeExtent(extentsStore, "test1");
    expect(getDomainFromExtents(get(extentsStore))).toEqual([-10, 200]);
  });
});
