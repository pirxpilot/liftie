var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/snowmass');

/*global describe, it */
describe('parse snowmass', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowmass.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
       'Assay Hill': 'closed',
       'Alpine Springs': 'closed',
       'Two Creeks': 'closed',
       'Elk Camp': 'closed',
       'Meadows Lift': 'closed',
       'High Alpine': 'closed',
       'Sky Cab': 'closed',
       'Elk Camp Gondola': 'closed',
       'Village Express': 'closed',
       'Burlingame': 'closed',
       'Coney Glade': 'closed',
       'Sam\'s Knob': 'closed',
       'Campground': 'closed',
       'Big Burn': 'closed',
       'Sheer Bliss': 'closed',
       'Scooper': 'closed',
       'Cirque Surface Lift': 'closed',
       'Burlingame Carpet': 'closed',
       'Meadows Carpet': 'closed',
       'Treehouse Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});