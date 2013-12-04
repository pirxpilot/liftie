var should = require('should');
var weather = require('../../lib/weather');

/*global describe, it*/

describe('weather', function() {

  it('should return empty forecast for unsupported locations', function(done) {
    weather({
      id: 'xyz'
    }, function(err, forecast) {
      should.not.exist(err);
      should.not.exist(forecast);
      done();
    });
  });


  if (!process.env.OPENSNOW_API_KEY) {
    it.skip('should return forecast for valid location');
  } else{
    it('should return forecast for valid location', function(done) {
      weather({
        counter: 1,
        id: 'killington'
      }, function(err, forecast) {
        should.not.exist(err);
        should.exist(forecast);
        forecast.should.have.property('icon').with.length(2);
        forecast.should.have.property('date').with.match(/\d{4}-\d{2}-\d{2}/);
        forecast.should.have.property('text').with.type('string');
        forecast.should.have.property('conditions').with.type('string');
        forecast.should.have.property('snow').with.type('string');
        forecast.should.have.property('temperature').with.type('object');
        forecast.temperature.should.have.property('max').with.type('number');
        done(err);
      });
    });
  }

});