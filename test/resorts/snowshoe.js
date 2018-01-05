var parse = require('../../lib/lifts/parse')('snowshoe');

/*global describe, it */
describe('parse snowshoe', function() {

  it('should return lift status', function() {
    var data = require('./example/snowshoe.json');
    var expected = {
      'Flying Eagle': 'open',
      'Cascade': 'open',
      'Mountaineer': 'open',
      'Cubb Run': 'open',
      'Magic Carpet': 'open',
      'Tow Rope': 'open',
      'Ballhooter': 'open',
      'Grabhammer': 'open',
      'Skidder': 'open',
      'Powder Monkey': 'open',
      'Powderidge': 'open',
      'Soaring Eagle Express': 'open',
      'Western Express': 'open',
      'Wonder Carpet': 'open'
    };
    parse(data).should.eql(expected);
  });
});
