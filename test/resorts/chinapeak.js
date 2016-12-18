var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/chinapeak');

/*global describe, it */
describe('parse chinapeak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/chinapeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Chair 1': 'scheduled',
        'Chair 2': 'open',
        'Chair 3': 'closed',
        'Chair 4': 'closed',
        'Chair 5': 'closed',
        'Chair 6': 'open',
        'Chair 7': 'closed',
        'Kids Carpet': 'closed',
        'Boulder Carpet': 'closed',
        'Juniper Carpet': 'open',
        'Tubing Hill': 'closed',
        'T-Bar': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
