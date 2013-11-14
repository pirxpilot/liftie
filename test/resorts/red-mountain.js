var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/red-mountain');

/*global describe, it */
describe('parse red-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/red-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Silverlode Chair (Quad)': 'closed',
        'Motherlode Chair (Triple)': 'closed',
        'Paradise Chair (Triple)': 'closed',
        'Red Chair (Double)': 'closed',
        'T-Bar': 'closed',
        'Red Carpet': 'closed',
        'Cat Skiing*': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});