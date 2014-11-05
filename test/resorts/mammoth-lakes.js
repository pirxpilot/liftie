var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mammoth-lakes');

/*global describe, it */
describe('parse mammoth-lakes', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mammoth-lakes.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Broadway Express 1': 'closed',
        'Stump Alley Express 2': 'closed',
        'Face Lift Express 3': 'closed',
        'Thunder Bound Express 6': 'closed',
        'Gold Rush Express 10': 'closed',
        'Discovery Chair 11': 'closed',
        'Chair 12': 'closed',
        'Chair 13': 'closed',
        'Chair 14': 'closed',
        'Chair 23': 'closed',
        'Panorama Lower': 'closed',
        'Panorama Upper': 'closed',
        'Cloud 9 Express': 'closed',
        'Eagle Express 15': 'closed',
        'Chair 25': 'closed',
        'Eagle Platter': 'closed',
        'Roller Coaster Express 4': 'closed',
        'Chair 5': 'closed',
        'Chair 7': 'closed',
        'Chair 8': 'closed',
        'Canyon Express 16': 'closed',
        'Schoolyard Express 17': 'closed',
        'Chair 20': 'closed',
        'Chair 21': 'closed',
        'Chair 22': 'closed',
        'Festival Poma': 'closed',
        'Heimo\'s Platter': 'closed',
        'Village Gondola': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});