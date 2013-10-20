var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/grand-targhee');

/*global describe, it */
describe('parse grand-targhee', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/grand-targhee.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Mary\'s Nipple': 'closed',
        'Dreamcatcher': 'scheduled',
        'Sacajawea': 'scheduled',
        'Blackfoot': 'scheduled',
        'Shoshone': 'scheduled',
        'Papoose Conveyor': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});