var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/brettonwoods');

/*global describe, it */
describe('parse brettonwoods', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brettonwoods.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'B-Lift Double': 'closed',
        'Rosebrook Summit Express': 'closed',
        'Bethlehem Express': 'closed',
        'Telegraph T-Bar': 'closed',
        'Fabyan\'s Express Triple': 'closed',
        'West Mountain Express': 'closed',
        'Learning Center Quad': 'closed',
        'Wonder Carpet': 'closed',
        'Red Carpet': 'closed',
        'Zephyr': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});