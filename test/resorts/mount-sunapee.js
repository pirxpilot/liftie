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
        "Sunapee Express Quad": "closed",
        "Sunbowl Express Quad": "closed",
        "North Peak Triple": "closed",
        "Spruce Triple": "closed",
        "Duckling Double": "closed",
        "Clipper Ship Quad": "closed",
        "Middle Carpet": "closed",
        "Flying Carpet": "closed",
        "Piggyback": "closed",
        "Small Carpet": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
