var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('brianhead');

/*global describe, it */
describe('parse brianhead', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brianhead.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Wildflower': 'open',
        'Giant Steps Express': 'open',
        'Blackfoot': 'open',
        'Navajo': 'open',
        'Roulette': 'hold',
        'Pioneer': 'open',
        'The Dunes': 'hold',
        'Alpen Glow': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
