var parse = require('../../lib/lifts/parse')('mammoth-lakes');

/*global describe, it */
describe('parse mammoth-lakes', function() {

  it('should return lift status', function(done) {
    var data = require('./example/mammoth-lakes.json');
    var expected = {
      'Broadway Express 1': 'scheduled',
      'Stump Alley Express 2': 'scheduled',
      'Face Lift Express 3': 'scheduled',
      'Unbound Express 6': 'scheduled',
      'Gold Rush Express 10': 'scheduled',
      'Discovery Express 11': 'scheduled',
      'Chair 12': 'scheduled',
      'Chair 13': 'scheduled',
      'Chair 14': 'scheduled',
      'Chair 23': 'scheduled',
      'Panorama Lower': 'scheduled',
      'Panorama Upper': 'scheduled',
      'Cloud Nine Express 9': 'scheduled',
      'Eagle Express 15': 'scheduled',
      'Chair 25': 'scheduled',
      'Eagle Platter': 'scheduled',
      'Roller Coaster Express 4': 'scheduled',
      'High 5 Express': 'scheduled',
      'Chair 7': 'scheduled',
      'Chair 8': 'scheduled',
      'Canyon Express 16': 'scheduled',
      'Schoolyard Express 17': 'scheduled',
      'Chair 20': 'closed',
      'Chair 21': 'scheduled',
      'Chair 22': 'scheduled',
      'Festival Poma': 'scheduled',
      'Heimo’s': 'closed',
      'Village Gondola': 'scheduled'
    };
    parse(data, function(err, liftStatus) {
      liftStatus.should.eql(expected);
      done(err);
    });
  });
});
