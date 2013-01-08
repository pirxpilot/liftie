var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/crested-butte').parse;

/*global describe, it */
describe('parse crested-butte', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/crested-butte.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Red Lady Express': 'open',
        'Silver Queen Express': 'open',
        'Gold Link Lift': 'open',
        'Prospect Lift': 'open',
        'East River Express': 'open',
        'Teocalli Lift': 'closed',
        'Paradise Express': 'open',
        'West Wall Lift': 'open',
        'Twister Lift': 'closed',
        'North Face Lift': 'closed',
        'The High Lift': 'closed',
        'Peachtree Lift': 'open',
        'Painter Boy Lift': 'open',
        'Aspen Magic Carpet': 'open',
        'Pine Magic Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});