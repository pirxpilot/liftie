var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/loveland');

/*global describe, it */
describe('parse loveland', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/loveland.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Lift 1': 'open',
        'Lift 2': 'open',
        'Lift 3': 'closed',
        'Lift 4': 'closed',
        'Lift 6': 'open',
        'Lift 7': 'open',
        'Lift 8': 'closed',
        'Lift 9': 'closed',
        'Magic Carpet': 'closed',
        'PTARMIGAN LIFT': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});