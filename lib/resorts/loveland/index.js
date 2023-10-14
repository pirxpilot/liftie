const { findText } = require('../../tools/domutil');

module.exports = {
  selector: '.tablepress-table-name',
  parse(node) {
    const [name, status] = findText(node).split(' – ');
    return {
      name,
      status
    };
  }
};
