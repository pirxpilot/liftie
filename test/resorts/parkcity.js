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
        'Crescent Express': 'closed',
        'Day Break': 'open',
        'DreamCatcher': 'open',
        'DreamScape': 'open',
        'Eagle': 'closed',
        'Eaglet': 'closed',
        'First Time Express': 'open',
        'Flat Iron': 'open',
        'Frostwood Gondola': 'open',
        'High Meadow': 'open',
        'Iron Mountain Express': 'open',
        'Jupiter': 'closed',
        'King Con Express': 'hold',
        'Mine Cart': 'open',
        'McConkey\'s Express': 'open',
        'Motherlode Express': 'open',
        'Ninety-Nine 90 Express': 'open',
        'Orange Bubble Express': 'open',
        'PayDay Express': 'open',
        'Peak 5': 'open',
        'Pioneer': 'closed',
        'Quicksilver Gondola - North': 'closed',
        'Quicksilver Gondola - South': 'closed',
        'Red Pine Gondola': 'open',
        'Rip Cord': 'open',
        'Saddleback Express': 'open',
        'Short Cut': 'open',
        'Silver Lining': 'open',
        'Silver Star': 'hold',
        'Silverlode Express': 'open',
        'Sun Peak Express': 'open',
        'Sunrise': 'open',
        'Super Condor Express': 'open',
        'Sweet Pea': 'open',
        'Thaynes': 'closed',
        'Timberline': 'open',
        'Tombstone Express': 'open',
        'Tommy Knocker': 'open',
        'Town': 'hold'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
