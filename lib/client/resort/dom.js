function removeAllChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function next({ nextElementSibling, nextSibling }) {
  return nextElementSibling || nextSibling;
}

module.exports = {
  next,
  removeAllChildren
};
