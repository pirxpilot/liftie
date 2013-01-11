var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/snowmass').parse;

/*global describe, it */
describe('parse snowmass', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowmass.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
       'Coney Glade': 'open',
       'Sam\'s Knob': 'open',
       'Big Burn': 'open',
       'Alpine Springs': 'open',
       'High Alpine': 'open',
       'Campground': 'open',
       'Elk Camp': 'open',
       'Two Creeks': 'open',
       'Assay Hill': 'open',
       'Treehouse Carpet': 'open',
       'Scooper': 'closed',
       'Burlingame': 'closed',
       'Sheer Bliss': 'open',
       'Cirque Surface Lift': 'closed',
       'Village Express': 'open',
       'Sky Cab': 'open',
       'Burlingame Carpet': 'closed',
       'Elk Camp Gondola': 'open',
       'Meadows Carpet': 'open',
       'Sun Kids Carpet #2': 'closed',
       'Meadows Lift': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});