const path = require('node:path');

module.exports = {
  templates: path.resolve(__dirname, '../../templates'),
  lib: path.resolve(__dirname, '../resorts'),
  test: path.resolve(__dirname, '../../test/resorts')
};
