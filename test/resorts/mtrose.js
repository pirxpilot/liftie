var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('mtrose');

/*global describe, it */
describe('parse mtrose', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtrose.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Northwest 6': 'closed',
        'Blazing Zephyr 6*': 'closed',
        'Chuter': 'closed',
        'Lakeview': 'closed',
        'Galena': 'closed',
        'Wizard': 'closed',
        'Magic East': 'closed',
        'Magic West': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
