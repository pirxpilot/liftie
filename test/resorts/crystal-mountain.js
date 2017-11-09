var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('crystal-mountain');

/*global describe, it */
describe('parse crystal-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/crystal-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Gondola': 'closed',
        'Chinook Express': 'closed',
        'Discovery': 'closed',
        'Forest Queen': 'closed',
        'Gold Hills': 'closed',
        'Green Valley': 'closed',
        'Chair 6': 'closed',
        'Northway': 'closed',
        'Quicksilver': 'closed',
        'Rainier Express': 'closed',
        'Magic Carpet': 'closed',
        'Sasquatch Park': 'closed',
        'Southback': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
