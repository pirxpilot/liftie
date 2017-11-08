var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('ischgl-silvretta-arena');

/*global describe, it */
describe('parse ischgl-silvretta-arena', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/ischgl-silvretta-arena.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Alp Trider Sattelbahn': 'closed',
        'Doppelstöckige Pendelbahn': 'closed',
        'Fimbabahn': 'closed',
        'Flimjochbahn': 'closed',
        'Flimsattelbahn': 'closed',
        'Silvrettabahn': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
