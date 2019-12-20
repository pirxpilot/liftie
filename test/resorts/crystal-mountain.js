const assert = require('assert');
const parse = require('../../lib/lifts/parse')('crystal-mountain');

/*global describe, it */
describe('parse crystal-mountain', function() {

  it('should return lift status', function() {
    const data = require('./example/crystal-mountain.json');
    const expected = {
      'Mt. Rainier Gondola': 'closed',
      'Chinook Express': 'open',
      'Discovery': 'open',
      'Forest Queen': 'open',
      'Gold Hills': 'closed',
      'Green Valley': 'open',
      'Chair 6': 'closed',
      'Northway': 'closed',
      'Quicksilver': 'open',
      'Rainier Express': 'open'
    };
    assert.deepEqual(parse(data), expected);
  });
});
