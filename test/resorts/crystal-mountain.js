var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/crystal-mountain');

/*global describe, it */
describe('parse crystal-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/crystal-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Chinook Express': 'closed',
        'Discovery': 'closed',
        'Forest Queen Express': 'closed',
        'Gold Hills': 'closed',
        'Gondola': 'closed',
        'Green Valley': 'closed',
        'High Campbell': 'closed',
        'Northway': 'closed',
        'Quicksilver': 'closed',
        'Rainier Express': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});