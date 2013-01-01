var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/loon').parse;

/*global describe, it */
describe('parse loon', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/loon.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'East Basin Chair': 'closed',
       'Gondola - Express': 'open',
       'Little Sister Chair': 'open',
       'Seven Brothers Chair': 'open',
       'North Peak Express Quad': 'open',
       'Lincoln Express Quad': 'open',
       'Tote Road Quad': 'open',
       'Children Center Carpet Lift': 'open',
       'Kancamagus Express Quad': 'open',
       'Kissin\' Cousin Chair': 'open',
       'Sarsaparilla Carpet Lift': 'open',
       'Sarsaparilla Handle Tow': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});