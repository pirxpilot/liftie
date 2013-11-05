var should = require('should');
var weather = require('../../lib/weather');

/*global describe, it*/

describe('weather', function() {

  it('should return empty forecast if location is missing', function(done) {
    weather({}, function(err, forecast) {
      should.not.exist(err);
      should.not.exist(forecast);
      done();
    });
  });


  if (!process.env.WUND_API_KEY) {
    it.skip('should return forecast for valid location');
  } else{
    it('should return forecast for valid location', function(done) {
      weather({
        counter: 1,
        ll: [-72.7933, 43.6647] // Killington, VT
      }, function(err, forecast) {
        should.not.exist(err);
        should.exist(forecast);
        forecast.should.have.property('icon').with.type('string');
        forecast.should.have.property('date').with.match(/\d{4}-\d{2}-\d{2}/);
        forecast.should.have.property('text').with.type('string');
        forecast.should.have.property('conditions').with.type('string');
        forecast.should.have.property('snow').with.type('number');
        forecast.should.have.property('temperature').with.type('object');
        forecast.temperature.should.have.property('max').with.type('number');
        forecast.temperature.should.have.property('min').with.type('number');
        done(err);
      });
    });
  }

});