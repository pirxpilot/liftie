var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/boreal').parse;

/*global describe, it */
describe('parse boreal', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/boreal.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Castle Peak Quad': 'open',
        'Accelerator Express Quad': 'open',
        'Nugget Chair': 'open',
        '49\'er Triple': 'closed',
        'Lost Dutchman Triple': 'open',
        'Cedar Ridge Triple': 'open',
        'Kids Club': 'open',
        'Superpipe': 'open',
        'Boardercross': 'closed',
        'Bag Jump': 'closed',
        'Playland Tubing Park': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});