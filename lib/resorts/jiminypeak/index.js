var domutil = require('../../tools/domutil');

module.exports = {
  selector: '#lift-data .list-group-item',
  parse: {
    name: node => domutil.findText(node),
    status: {
      child: 2,
      attribute: 'class',
      fn: s => s.split('-').pop()
    }
  }
};
