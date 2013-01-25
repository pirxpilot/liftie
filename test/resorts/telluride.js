var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/telluride').parse;

/*global describe, it */
describe('parse telluride', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/telluride.xml');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Oak Street Lift (8)': 'closed',
        'Coonskin Lift (7)': 'open',
        'Free Gondola': 'open',
        'Free Intercept Gondola': 'open',
        'Chondola (1)': 'open',
        '2 Park Lift': 'closed',
        'Village Express (4)': 'open',
        'Plunge Lift (9)': 'open',
        'Apex Lift (6)': 'open',
        'Polar Queen Express (5)': 'open',
        'Gold Hill Express (14)': 'open',
        'Revelation Lift (15)': 'closed',
        'Prospect Express (12)': 'open',
        'Lynx (13)': 'open',
        'UTE Park (11)': 'open',
        'Sunshine Express (10)': 'open',
        'Meadows Magic Carpet': 'open',
        'Gondola Magic Carpet': 'open'      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});