var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/cranmore-mountain');

/*global describe, it */
describe('parse cranmore-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/cranmore-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        "Skimobile Express Quad": "open",
        "C-more Double": "open",
        "South Quad": "open",
        "Flying Carpet": "closed",
        "Lookout Triple": "closed",
        "Magic Carpet": "open",
        "Schneider Triple": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});