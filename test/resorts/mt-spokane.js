var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('mt-spokane');

/*global describe, it */
describe('parse mt-spokane', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mt-spokane.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Chair #1': 'closed',
        'Chair #2': 'open',
        'Chair #3': 'open',
        'Chair #4': 'closed',
        'Chair #5': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});