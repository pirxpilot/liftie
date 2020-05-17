const should = require('should');
const noaa = require('../../lib/weather/noaa');

/*global describe, it*/

describe('noaa', function() {

  it('should return empty forecast if location is missing', function(done) {
    noaa({
      ll: [0, 0]
    }, function(err, forecast) {
      should.not.exist(err);
      should.not.exist(forecast);
      done();
    });
  });


  it('should return forecast for valid location', function(done) {
    noaa({
      // Killington, VT
      noaa: 'BTV/107,21',
      ll: [-72.7933, 43.6647]
    }, function(err, forecast) {
      should.not.exist(err);
      should.exist(forecast);
      forecast.should.have.property('icon', ['icon-cloud', 'icon-sunny']);
      forecast.should.have.property('date', '2019-01-02');
      forecast.should.have.property('text', 'Partly sunny, with a high near 25. East wind around 3 mph.');
      forecast.should.have.property('conditions', 'Partly Sunny');
      forecast.should.have.property('temperature').with.type('object');
      forecast.temperature.should.have.property('max', 25);
      done(err);
    });
  });

});
