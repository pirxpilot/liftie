var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mt-buller');

/*global describe, it */
describe('parse mt-buller', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mt-buller.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'lift 1': 'open',
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});