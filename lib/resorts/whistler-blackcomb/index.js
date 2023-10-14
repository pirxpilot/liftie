const toTitleCase = require('to-title-case');

module.exports = {
  selector: 'lift',
  parse: {
    name: {
      attribute: 'name',
      fn: s => toTitleCase(s)
        .replace(/(\d+)Th/, '$1th')
        .replace(/t.bar/i, 'T-Bar')
    },
    status: {
      attribute: 'status'
    }
  }
};
