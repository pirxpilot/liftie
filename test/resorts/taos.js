var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('taos');

/*global describe, it */
describe('parse taos', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/taos.xml');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'No. 4, Kachina': 'closed',
        'No. 7, Maxie\'s': 'closed',
        'No. 5, High Five': 'closed',
        'No. 1, Al\'s Run': 'closed',
        'No. 6, Winston': 'closed',
        'No. 2, Reforma': 'closed',
        'No. 8, West Basin': 'closed',
        'No. 7a, 7th Heaven': 'closed',
        'The Rueggli': 'closed',
        'Zipper 1': 'closed',
        'Zipper 2': 'closed',
        'No. 3, Strawberry Hill': 'closed',
        'Zipper 3': 'closed',
        'Pioneers Chair': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});