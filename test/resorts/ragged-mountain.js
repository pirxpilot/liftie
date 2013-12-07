var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/ragged-mountain');

/*global describe, it */
describe('parse ragged-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/ragged-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        "Barnyard Triple": "closed",
        "Beginners Basin Carpet": "closed",
        "Six Pack": "open",
        "Spear Mountain Triple": "open",
        "Tubing Carpet": "closed",
        "Village Green": "closed",
        "Wonder Carpet": "open"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});