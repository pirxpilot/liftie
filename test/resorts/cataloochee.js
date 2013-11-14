var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/cataloochee');

/*global describe, it */
describe('parse cataloochee', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/cataloochee.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Easy Way': 'closed',
        'Omigosh': 'closed',
        'Rock Island': 'closed',
        'Wolf Creek Hollow Conveyor': 'closed',
        'Beginner\'s Luck Hollow Conveyor': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});