var parse = require('../../lib/lifts/parse')('bluemountain');

/*global describe, it */
describe('parse bluemountain', function() {

  it('should return lift status', function() {
    var data = require('./example/bluemountain.json');
    var expected = {
      'Century Express': 'open',
      'Easy Rider': 'open',
      'Explorer': 'open',
      'Graduate': 'open',
      'Little Ripper': 'open',
      'Orchard Express': 'open',
      'Silver Bullet': 'open',
      'Southern Comfort': 'open',
      'Undergrad': 'open',
      'Voyageur': 'open',
      'Weider Express': 'open'
    };
    parse(data).should.eql(expected);
  });
});
