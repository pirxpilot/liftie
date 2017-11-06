var domutil = require('../../tools/domutil');

module.exports = {
  selector: 'table.report2 td.report3',
  parse: function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.prev.children[0].attribs.src.split('/').pop().slice(5, -4)
    };
  }
};
