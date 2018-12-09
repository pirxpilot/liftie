var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('taos');

/*global describe, it */
describe('parse taos', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/taos.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Lift 1': 'open',
        'Lift 2': 'open',
        'Lift 4': 'closed',
        'Lift 7': 'closed',
        'Lift 7A': 'closed',
        'Lift 8': 'closed',
        'Kachina Peak': 'closed',
        'Pioneer': 'open',
        'Zipper 1': 'closed',
        'Zipper 2': 'closed',
        'Zipper 3': 'open',
        'Zipper 4': 'open',
        'Rueggli': 'closed',
        'Gondolita': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
