var parse = require('../../lib/lifts/parse')('tremblant');

/*global describe, it */
describe('parse tremblant', function() {

  it('should return lift status', function() {
    var data = require('./example/tremblant.json');
    var expected = {
      'Flying Mile': 'open',
      'Tapis Magique Équilibre 2': 'open',
      'Porte du Soleil': 'open',
      'Tapis Magique Onésime': 'open',
      'Tapis Magique Équilibre 1': 'open',
      'Cabriolet': 'open',
      'Télécabine Express': 'open',
      'TGV': 'open',
      'Duncan Express': 'scheduled',
      'Expo Express': 'open',
      'Lowell Thomas': 'open',
      'Edge': 'closed',
      'Télécabine Casino Express': 'open',
      'Le Soleil': 'open'
    };
    parse(data).should.eql(expected);
  });
});
