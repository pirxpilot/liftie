var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/snowbird');

/*global describe, it */
describe('parse snowbird', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowbird.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'open',
        'Baby Thunder': 'open',
        'Baldy': 'open',
        'Chickadee': 'open',
        'Gad 2': 'open',
        'Gadzoom': 'open',
        'Little Cloud': 'open',
        'Mid-Gad': 'open',
        'Mineral Basin': 'open',
        'Peruvian': 'open',
        'Wilbere': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});