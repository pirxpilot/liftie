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
        'Bonanza Express': 'open',
        'Cabriolet Gondola': 'open',
        'Crescent Express': 'open',
        'Daybreak': 'open',
        'DreamCatcher': 'open',
        'Dreamscape': 'open',
        'Eagle': 'open',
        'Eaglet': 'open',
        'First Time Express': 'open',
        'Flat Iron': 'open',
        'Frostwood Gondola': 'open',
        'High Meadow': 'open',
        'Iron Mountain': 'open',
        'Jupiter': 'open',
        'King Con Express': 'open',
        'McConkey\'s Express': 'open',
        'Motherlode Express': 'open',
        'Ninety-Nine 90 Express': 'open',
        'Orange Bubble Express': 'open',
        'PayDay Express': 'open',
        'Peak 5': 'open',
        'Pioneer': 'open',
        'Quicksilver Gondola - North': 'open',
        'Quicksilver Gondola - South': 'open',
        'Red Pine Gondola': 'open',
        'Rip Cord': 'open',
        'Saddleback Express': 'open',
        'Short Cut': 'open',
        'Silver Star': 'open',
        'Silverlode Express': 'open',
        'Sun Peak Express': 'open',
        'Sunrise': 'open',
        'Super Condor Express': 'open',
        'Sweet Pea': 'open',
        'Thaynes': 'open',
        'Timberline': 'open',
        'Tombstone Express': 'open',
        'Town': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});