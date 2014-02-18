var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/king-pine');

/*global describe, it */
describe('parse king-pine', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/king-pine.xml');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Polar Bear Triple': 'scheduled',
        'Black Bear Triple': 'scheduled',
        'Powder Bear Triple': 'scheduled',
        'Cubby Tow': 'scheduled',
        'Bear Rug Carpet': 'scheduled',
        'Tubing Park Tow': 'scheduled'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});