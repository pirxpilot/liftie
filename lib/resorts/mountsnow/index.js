const { childText, child } = require('../../tools/domutil');

function parse(node) {
  let name = childText(node, 1);
  let match = name.match(/^#\d+\s+(.+)$/);
  if (!match) {
    return;
  }

  return {
    name: match[1],
    status: child(node, '0/0').attribs.class.split('-').pop()
  };
}

module.exports = {
  selector: '.lift-wrapper .report-lift',
  parse
};
