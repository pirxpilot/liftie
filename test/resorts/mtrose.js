var should = require('should');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/mtrose');

/*global describe, it */
describe('parse mtrose', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtrose.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Northwest Magnum 6': 'closed',
        'Blazing Zephyr 6 (Slide Bowl)': 'closed',
        'Chuter': 'closed',
        'Lakeview': 'closed',
        'Galena': 'closed',
        'Ponderosa': 'closed',
        'Flying Jenny': 'closed'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});