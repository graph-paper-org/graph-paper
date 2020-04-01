/* eslint-disable import/prefer-default-export */
import { listen } from "svelte/internal";
import { placeElement } from "../utils/float-placement";

const defaults = {
  duration: 50,
  location: "bottom",
  alignment: "center",
  distance: 4,
};

export function tooltip(node, args) {
  const options = { ...defaults, ...args };
  const { duration, location, alignment, distance } = options;
  const el = document.createElement("div");
  el.className = "tooltip";
  el.textContent = options.text;
  el.style.position = "absolute";
  el.style.transition = `opacity ${duration}ms, transform ${duration}ms`;

  function setLocation() {
    const [left, top] = placeElement({
      location,
      alignment,
      distance,
      parentPosition: node.getBoundingClientRect(),
      elementPosition: el.getBoundingClientRect(),
      y: window.scrollY,
    });

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
  }

  function append() {
    if (el.textContent.length && options.text) {
      el.textContent = options.text;
      document.body.appendChild(el);
      el.style.opacity = "0";

      setTimeout(() => {
        el.style.opacity = "1";
      });
      setLocation();
    }
  }

  function remove() {
    el.remove();
  }

  const removeEnter = listen(node, "mouseenter", append);
  const removeLeave = listen(node, "mouseleave", remove);

  return {
    destroy() {
      remove();
      removeEnter();
      removeLeave();
    },
    update(args) {
      el.textContent = args.text;
    },
  };
}
