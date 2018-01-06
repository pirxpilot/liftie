var parse = require('../../lib/lifts/parse')('sunshine-village');

/*global describe, it */
describe('parse sunshine-village', function() {

  it('should return lift status', function() {
    var data = require('./example/sunshine-village.json');
    var expected = {
      'Angel': 'open',
      'Wolverine': 'open',
      'Goat\'s Eye': 'open',
      'Jackrabbit': 'open',
      'Teepee Town': 'open',
      'Divide': 'open',
      'Standish': 'open',
      'Strawberry': 'open',
      'Gondola': 'open',
      'Wawa': 'open',
      'Mitey Mite': 'open',
      'Kids Kampus': 'open'
    };
    parse(data).should.eql(expected);
  });
});
