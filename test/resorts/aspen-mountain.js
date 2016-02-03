var parse = require('../../lib/resorts/aspen-mountain');

/*global describe, it */
describe('parse aspen-mountain', function() {

  it('should return lift status', function() {
    var data = require('./example/aspen-mountain.json');
    var expected = {
      'Ruthies': 'closed',
      'Shadow Mountain': 'closed',
      'Silver Queen Gondola': 'open',
      'Little Nell': 'closed',
      'Bell Mountain': 'closed',
      'F.I.S.': 'closed',
      'Ajax Express': 'open',
      'Gent\'s Ridge': 'open'
    };
    parse(data).should.eql(expected);
  });
});