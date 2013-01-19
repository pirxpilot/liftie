var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/brianhead').parse;

/*global describe, it */
describe('parse brianhead', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brianhead.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Wildflower': 'open',
        'Giant Steps': 'open',
        'Blackfoot': 'open',
        'Navajo': 'open',
        'Roulette': 'open',
        'Pioneer': 'open',
        'The Dunes': 'open',
        'Alpen Glow': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});