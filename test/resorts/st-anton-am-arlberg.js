var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/st-anton-am-arlberg');

/*global describe, it */
describe('parse stanton', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/st-anton-am-arlberg.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Galzigbahn': 'open',
        'Vallugabahn I': 'open',
        'Rendlbahn': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});