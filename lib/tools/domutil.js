function findText(node) {
  while(node && node.type !== 'text') {
    node = node.children && node.children[0];
  }
  if (node) {
    return node.data;
  }
}

module.exports = {
  findText: findText
};