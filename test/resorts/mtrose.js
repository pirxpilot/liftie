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
        'Northwest Mag 6': 'open',
        'Blazing Zephyr 6*': 'open',
        'Chuter': 'closed',
        'Lakeview': 'open',
        'Galena': 'open',
        'Wizard': 'open',
        'Magic East': 'open',
        'Magic West': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
