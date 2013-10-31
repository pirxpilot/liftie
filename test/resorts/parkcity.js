var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/parkcity');

/*global describe, it */
describe('parse parkcity', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/parkcity.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '3 Kings': 'open',
        Crescent: 'open',
        Eagle: 'open',
        'First Time': 'open',
        Jupiter: 'open',
        Eaglet: 'open',
        'King Con': 'open',
        'Silver Star': 'open',
        'McConkey\'s': 'open',
        Pioneer: 'open',
        PayDay: 'open',
        Town: 'open',
        Bonanza: 'open',
        Silverlode: 'open',
        Motherlode: 'open',
        Thaynes: 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});