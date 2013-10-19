var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/big-sky');

/*global describe, it */
describe('parse big-sky', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/big-sky.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Adrian\'s Way Carpet': 'open',
        'Bear Back Poma': 'open',
        'Cascade': 'open',
        'Challenger': 'open',
        'Dakota': 'open',
        'Explorer': 'open',
        'Iron Horse': 'open',
        'Little Thunder': 'open',
        'Lone Moose': 'open',
        'Lone Peak Tram': 'open',
        'Lone Peak Triple': 'open',
        'Middle Mountain Carpet': 'open',
        'Pony Express': 'open',
        'Ramcharger': 'open',
        'Shedhorn': 'open',
        'Small Fry Carpet': 'open',
        'Southern Comfort': 'open',
        'Swift Current': 'open',
        'Thunder Wolf': 'open',
        'White Otter': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});