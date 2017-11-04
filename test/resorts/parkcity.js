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
        '3 Kings': 'closed',
        'Bonanza Express': 'closed',
        'Cabriolet Gondola': 'closed',
        'Crescent Express': 'closed',
        'Day Break': 'closed',
        'DreamCatcher': 'closed',
        'DreamScape': 'closed',
        'Eagle': 'closed',
        'Eaglet': 'closed',
        'First Time Express': 'closed',
        'Flat Iron': 'closed',
        'Frostwood Gondola': 'closed',
        'High Meadow': 'closed',
        'Iron Mountain Express': 'closed',
        'Jupiter': 'closed',
        'King Con Express': 'closed',
        'McConkey\'s Express': 'closed',
        'Mine Cart': 'closed',
        'Motherlode Express': 'closed',
        'Mule Train': 'closed',
        'Ninety-Nine 90 Express': 'closed',
        'Orange Bubble Express': 'closed',
        'PayDay Express': 'closed',
        'Peak 5': 'closed',
        'Pioneer': 'closed',
        'Quicksilver Gondola - North': 'closed',
        'Quicksilver Gondola - South': 'closed',
        'Red Pine Gondola': 'closed',
        'Rip Cord': 'closed',
        'Saddleback Express': 'closed',
        'Short Cut': 'closed',
        'Silver Lining': 'closed',
        'Silver Star': 'closed',
        'Silverlode Express': 'closed',
        'Sun Peak Express': 'closed',
        'Sunrise': 'closed',
        'Super Condor Express': 'closed',
        'Sweet Pea': 'closed',
        'Thaynes': 'closed',
        'Timberline': 'closed',
        'Tombstone Express': 'closed',
        'Tommy Knocker': 'closed',
        'Town': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
