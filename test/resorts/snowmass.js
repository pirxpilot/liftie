var parse = require('../../lib/lifts/parse')('snowmass');

/*global describe, it */
describe('parse snowmass', function() {

  it('should return lift status', function() {
    var data = require('./example/snowmass.json');
    var expected = {
     'Assay Hill': 'closed',
     'Alpine Springs': 'closed',
     'Two Creeks': 'closed',
     'Elk Camp': 'closed',
     'Meadows Lift': 'open',
     'High Alpine': 'closed',
     'Sky Cab': 'open',
     'Elk Camp Gondola': 'open',
     'Village Express': 'open',
     'Coney Glade': 'closed',
     'Sam\'s Knob': 'open',
     'Campground': 'closed',
     'Big Burn': 'open',
     'Sheer Bliss': 'closed',
     'Cirque Surface Lift': 'closed',
     'Meadows Carpet': 'open',
     'Treehouse Carpet': 'open'
    };
    parse(data).should.eql(expected);
  });
});