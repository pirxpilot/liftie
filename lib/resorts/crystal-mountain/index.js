const { childText } = require('../../tools/domutil');

const states = [
  'open',
  'closed',
  'hold',
  'hold',
  'scheduled'
];

module.exports = {
  selector: '.row-hover tr',
  parse: function(node) {
    const status = parseInt(childText(node, 2), 10);

    if (isNaN(status)) {
      return;
    }

    return {
      name: childText(node, 1),
      status: states[status - 1]
    };
  }
};
