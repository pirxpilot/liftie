var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('angel-fire');

/*global describe, it */
describe('parse angel-fire', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/angel-fire.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Dreamcatcher': 'closed',
        'Lift #2': 'closed',
        'Chile Express': 'closed',
        'Liberation Park Lift': 'closed',
        'Southwest Flyer': 'closed',
        'Ski School Wondercarpet': 'closed',
        'Tubing Hill Wondercarpet': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
