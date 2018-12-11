const { childText } = require('../../tools/domutil');

module.exports = {
  selector: '#trailReport td[colspan="6"] strong',
  parse: function(node) {
    const [ name, status ] = childText(node, 0).split(/\s+-\s+/);
    return { name, status };
  }
};
