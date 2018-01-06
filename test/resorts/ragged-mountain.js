var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('ragged-mountain');

/*global describe, it */
describe('parse ragged-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/ragged-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Barnyard Triple': 'open',
        'Six Pack Summit Express': 'open',
        'Spear Mountain Quad': 'open',
        'Wanna Be Wild Carpet': 'open',
        'Meadows Carpet': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
