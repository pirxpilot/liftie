function removeAllChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function next(node) {
  return node.nextElementSibling || node.nextSibling;
}

module.exports = {
  next: next,
  removeAllChildren: removeAllChildren
};