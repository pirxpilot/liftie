var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/brianhead');

/*global describe, it */
describe('parse brianhead', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brianhead.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Wildflower': 'closed',
        'Giant Steps': 'closed',
        'Blackfoot': 'closed',
        'Navajo': 'closed',
        'Roulette': 'closed',
        'Pioneer': 'closed',
        'The Dunes': 'closed',
        'Alpen Glow': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});