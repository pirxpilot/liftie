const { childText } = require('../../tools/domutil');

module.exports = {
  selector: '.lift-stat.lift-name',
  parse: {
    name: 0,
    status: node => childText(node.prev, 0)
  }
};
