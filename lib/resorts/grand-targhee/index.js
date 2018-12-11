const { child, childText } = require('../../tools/domutil');

function parse(node) {
  if (node.children.length < 2) {
    return;
  }
  return {
    name: childText(node, 1),
    status: child(node, 0).attribs.class.split(' ').pop()
  };
}

module.exports = {
  selector: '.table:first-of-type th',
  parse
};
