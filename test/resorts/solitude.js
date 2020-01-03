const assert = require('assert');
const parse = require('../../lib/lifts/parse')('solitude');

/*global describe, it */
describe('parse solitude', function() {

  it('should return lift status', function() {
    const data = require('./example/solitude.json');
    const expected = {
      'Apex Express': 'open',
      'Eagle Express': 'open',
      'Honeycomb Return': 'closed',
      'Link': 'open',
      'Moonbeam Express': 'open',
      'Powderhorn II': 'open',
      'Summit Express': 'open',
      'Sunrise': 'open'
    };
    assert.deepEqual(parse(data), expected);
  });
});
