var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/mammoth-lakes').parse;

/*global describe, it */
describe('parse mammoth-lakes', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mammoth-lakes.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Broadway Express 1': 'scheduled',
        'Stump Alley Express 2': 'scheduled',
        'Face Lift Express 3': 'scheduled',
        'Thunder Bound Express 6': 'scheduled',
        'Gold Rush Express 10': 'scheduled',
        'Discovery Chair 11': 'scheduled',
        'Chair 12': 'scheduled',
        'Chair 13': 'scheduled',
        'Chair 14': 'scheduled',
        'Chair 23': 'scheduled',
        'Panorama Lower': 'scheduled',
        'Panorama Upper': 'scheduled',
        'Cloud 9 Express': 'scheduled',
        'Eagle Express 15': 'scheduled',
        'Chair 25': 'scheduled',
        'Eagle Platter': 'scheduled',
        'Roller Coaster Express 4': 'scheduled',
        'Chair 5': 'scheduled',
        'Chair 7': 'scheduled',
        'Chair 8': 'scheduled',
        'Canyon Express 16': 'scheduled',
        'Schoolyard Express 17': 'scheduled',
        'Chair 20': 'closed',
        'Chair 21': 'scheduled',
        'Chair 22': 'scheduled',
        'Festival Poma': 'scheduled',
        'Heimo\'s Platter': 'scheduled',
        'Village Gondola': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});