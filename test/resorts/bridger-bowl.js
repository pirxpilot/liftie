var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('bridger-bowl');

/*global describe, it */
describe('parse bridger-bowl', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/bridger-bowl.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Alpine': 'closed',
        'Bridger': 'closed',
        'Pierres Knob': 'closed',
        'Powder Park': 'closed',
        'Schlasman\'s': 'closed',
        'Snowflake': 'closed',
        'Sunnyside': 'closed',
        'Virginia City': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
