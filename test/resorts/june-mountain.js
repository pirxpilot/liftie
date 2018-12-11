var parse = require('../../lib/lifts/parse')('june-mountain');

/*global describe, it */
describe('parse june-mountain', function() {

  it('should return lift status', function(done) {
    var data = require('./example/june-mountain.json');
    var expected = {
      'J1': 'closed',
      'J2': 'closed',
      'J3': 'closed',
      'J4': 'closed',
      'J6': 'closed',
      'J7': 'closed'
    };
    parse(data, function(err, liftStatus) {
      liftStatus.should.eql(expected);
      done(err);
    });
  });
});
