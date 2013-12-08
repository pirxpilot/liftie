var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mount-sunapee');

/*global describe, it */
describe('parse mount-sunapee', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mount-sunapee.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        "Sunapee Express Quad": "open",
        "Sunbowl Quad": "open",
        "North Peak Triple": "open",
        "Spruce Triple": "closed",
        "Duckling Double": "closed",
        "Clipper Ship Quad": "open",
        "Middle Carpet": "closed",
        "Flying Carpet": "open",
        "Rope Tow": "closed",
        "Piggyback": "closed",
        "Small Carpet": "open"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});