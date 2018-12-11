const { childText } = require('../../tools/domutil');

function parse(node) {
  const name = childText(node, '0');
  if (!name) {
    return;
  }
  if (!name.startsWith('Lift')) {
    return;
  }
  return {
    name: name.slice(5),
    status: childText(node.next, '0')
  };
}

module.exports = {
  selector: '.row:nth-child(n + 7) td:nth-child(2n + 1)',
  parse
};
