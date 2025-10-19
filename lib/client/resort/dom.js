export function removeAllChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

export function next({ nextElementSibling, nextSibling }) {
  return nextElementSibling || nextSibling;
}
