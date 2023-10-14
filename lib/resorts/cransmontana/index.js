const toTitleCase = require('to-title-case');

module.exports = {
  selector: 'item',
  parse: {
    name: {
      attribute: 'nom',
      fn: toTitleCase
    },
    status: {
      attribute: 'stat'
    }
  }
};
