var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/whistler-blackcomb');

/*global describe, it */
describe('parse whistler-blackcomb', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/whistler-blackcomb.xml');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '7th Heaven Express': 'closed',
        'Cat Skinner Chair': 'closed',
        'Crystal Chair': 'closed',
        'Excalibur Gondola': 'closed',
        'Excelerator Express': 'closed',
        'Glacier Express': 'closed',
        'Horstman T-bar': 'closed',
        'Jersey Cream Express': 'closed',
        'Magic Chair': 'closed',
        'Showcase T-bar': 'closed',
        'Solar Coaster Express': 'closed',
        'Tube Park': 'open',
        'Wizard Express': 'closed',
        'Big Red Express': 'closed',
        'Creek Side Gondola': 'closed',
        'Emerald Express': 'closed',
        'Fitzsimmons Express': 'closed',
        'Franz\'s Chair': 'closed',
        'Garbanzo Express': 'closed',
        'Harmony Express': 'closed',
        'Olympic Chair': 'closed',
        'Peak To Peak': 'closed',
        'Symphony Express': 'closed',
        'T-bars': 'closed',
        'The Peak': 'closed',
        'Whistler Village Gondola': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});