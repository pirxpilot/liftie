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
        'Chair 2 Midway Only': 'open',
        'Chair 9': 'closed',
        'Chair 8': 'closed',
        'Chair 7': 'closed',
        'Chair 6': 'open',
        'Chair 4': 'closed',
        'Chair 3': 'closed',
        'Chair 1': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});