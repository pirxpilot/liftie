var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/tremblant').parse;

/*global describe, it */
describe('parse tremblant', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/tremblant.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Gondola': 'open',
        'Cabriolet': 'open',
        'Flying Mile': 'open',
        'TGV': 'open',
        'Porte du Soleil': 'open',
        'Tapis magique': 'open',
        'Le Soleil': 'open',
        'Destination': 'open',
        'Duncan': 'open',
        'Expo': 'open',
        'Lowell Thomas': 'open',
        'Edge': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});