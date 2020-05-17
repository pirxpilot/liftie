const assert = require('assert');
const parse = require('../../lib/lifts/parse')('silver-star');

/*global describe, it */
describe('parse silver-star', function() {

  it('should return lift status', function() {
    const data = require('./example/silver-star.json');
    const expected = {
      'Comet Express': 'open',
      'Powder Gulch Express': 'closed',
      'Silver Woods Express': 'open',
      'Silver Queen': 'open',
      'Alpine Meadows': 'open',
      'Gondola': 'open',
      'Home Run Tee': 'closed',
      'Discovery Carpet': 'open',
      'Tube Town Magic Carpet': 'open',
      'Adventure Centre Carpet': 'open'
    };
    assert.deepEqual(parse(data), expected);
  });
});
