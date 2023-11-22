const toTitleCase = require('to-title-case');

module.exports = {
  selector: '.table-striped > .rand', // selector for lift information
  parse: {
    name: {
      child: '2',
      fn: toTitleCase,
    },
    status: '0',
  },
};
