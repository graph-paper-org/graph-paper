export function outline(node) {
  const enclosingSVG = node.ownerSVGElement;

  // create a clone of the element.
  const clonedElement = node.cloneNode(true);
  node.parentElement.insertBefore(clonedElement, node);
  clonedElement.setAttribute("fill", "white");
  clonedElement.setAttribute("filter", "url(#outline-filter)");
  // apply the filter to this svg element.
  let outlineFilter = enclosingSVG.querySelector("#outline-filter");
  if (outlineFilter === null) {
    outlineFilter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    outlineFilter.id = "outline-filter";

    const morph = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feMorphology"
    );
    morph.setAttribute("operator", "dilate");
    morph.setAttribute("radius", "2");
    morph.setAttribute("in", "SourceGraphic");
    morph.setAttribute("result", "THICKNESS");

    const composite = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feComposite"
    );
    composite.setAttribute("operator", "out");
    composite.setAttribute("in", "THICKNESS");
    composite.setAttribute("in2", "SourceGraphic");

    outlineFilter.appendChild(morph);
    outlineFilter.appendChild(composite);
    enclosingSVG.prepend(outlineFilter);
  }

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  };
  const observer = new MutationObserver(() => {
    clonedElement.setAttribute("x", node.getAttribute("x"));
    clonedElement.setAttribute("y", node.getAttribute("y"));
    clonedElement.setAttribute("text-anchor", node.getAttribute("text-anchor"));
    clonedElement.setAttribute("dx", node.getAttribute("dx"));
    clonedElement.setAttribute("dy", node.getAttribute("dy"));
    clonedElement.innerHTML = node.innerHTML;
  });
  observer.observe(node, config);

  return {
    destroy() {
      clonedElement.remove();
    },
  };
}
