var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('hunter');

/*global describe, it */
describe('parse hunter', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/hunter.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Kaatskill Flyer': 'closed',
        'B-Lift': 'closed',
        'C-Lift': 'closed',
        'D-Lift': 'closed',
        'E-Lift': 'closed',
        'F-Lift': 'closed',
        'Carpet Lift': 'closed',
        'Frosty Land Carpet 1': 'closed',
        'Frosty Land Carpet 2': 'closed',
        'H-Lift': 'closed',
        'Zephyr Express': 'closed',
        'Pony Lift': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});