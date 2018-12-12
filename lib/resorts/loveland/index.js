const { findText } = require('../../tools/domutil');

module.exports = {
  selector: '.tablepress-table-name',
  parse: function(node) {
    const [ name, status ] = findText(node).split(' – ');
    return {
      name,
      status
    };
  }
};
