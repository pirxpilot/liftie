var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/angel-fire');

/*global describe, it */
describe('parse angel-fire', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/angel-fire.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Dreamcatcher': 'open',
        'Lift #2': 'open',
        'Chile Express': 'open',
        'Lift #3': 'closed',
        'Southwest Flyer': 'open',
        'Ski School Wondercarpet': 'open',
        'Tubing Wondercarpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});