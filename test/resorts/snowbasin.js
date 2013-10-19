var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/snowbasin');

/*global describe, it */
describe('parse snowbasin', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowbasin.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Strawberry Express': 'open',
        'Becker': 'open',
        'Little Cat Express': 'open',
        'Middle Bowl Triple': 'open',
        'Needles Express': 'open',
        'Wild Cat': 'closed',
        'Porcupine': 'open',
        'John Paul Express': 'open',
        'Mt. Allen Tram': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});