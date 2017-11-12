var domutil = require('../../tools/domutil');

module.exports = {
  selector: 'h3:contains(Lifts Open) ~ p:not(:last-child)',
  parse: function(node) {
    var name = domutil.childText(node, 0).replace(':', '').trim();
    var status = node.children.slice(1)
      .map(node => node.data)
      .join('');
    status = status.replace(/[:\s]*/g, '');
    return { name, status };
  }
};
