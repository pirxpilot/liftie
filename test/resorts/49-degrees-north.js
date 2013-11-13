var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/49-degrees-north');

/*global describe, it */
describe('parse 49-degrees-north', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/49-degrees-north.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '#1 Bonanza': 'closed',
        '#2 Grubstake': 'closed',
        '#3 Payday': 'closed',
        '#4 West Basin': 'closed',
        '#5 Sunrise Basin': 'closed',
        'Hobbit Surface Lift': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});