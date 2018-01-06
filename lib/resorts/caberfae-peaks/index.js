const { text } = require('../../tools/domutil');

module.exports = {
  selector: '#tablepress-4 td:nth-child(even)',
  parse: {
    name: 0,
    status: function(node) {
      return text(node.prev, { child: 0, attribute: 'alt' }).split('-').pop();
    }
  }
};

