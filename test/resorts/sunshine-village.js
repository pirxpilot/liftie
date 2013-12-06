var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sunshine-village');

/*global describe, it */
describe('parse sunshine-village', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sunshine-village.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        "Gondola": "open",
        "Angel": "closed",
        "Strawberry": "open",
        "Standish": "open",
        "Divide": "closed",
        "Goat's Eye": "closed",
        "Jackrabbit": "hold",
        "Wolverine": "hold",
        "Wawa": "open",
        "Teepee Town": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});