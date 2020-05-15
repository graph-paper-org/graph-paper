// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, get } from "svelte/store";

export function createOptionStore() {
  const initialState = [];
  const innerStore = writable(initialState);

  return {
    subscribe: innerStore.subscribe,
    add(key, label) {
      innerStore.update((is) => [...is, { key, label }]);
    },
    remove(key) {
      innerStore.update((is) => is.filter((o) => o.key !== key));
    },
    has(key) {
      return get(innerStore).some((o) => o.key === key);
    },
    reset() {
      innerStore.set(initialState);
    },
  };
}
