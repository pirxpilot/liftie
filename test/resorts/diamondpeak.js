var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/diamondpeak');

/*global describe, it */
describe('parse diamondpeak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/diamondpeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Crystal Express Lift': 'closed',
        'Lakeview Lift': 'closed',
        'Lodgepole Lift': 'closed',
        'Red Fox Lift': 'closed',
        'Ridge Lift': 'closed',
        'Schoolhouse Lift': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});