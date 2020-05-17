const should = require('should');
const openweather = require('../../lib/weather/openweather');

/*global describe, it */

describe('openweather', function() {
  it('should return forecast', function(done) {
    openweather({
      // Killington, VT
      ll: [-72.7933, 43.6647]
    }, 'testkey', function(err, forecast) {
      should.not.exist(err);
      should.exist(forecast);
      forecast.should.have.property('icon', [ 'basenone', 'icon-moon' ]);
      forecast.should.have.property('date', '2019-01-05');
      forecast.should.have.property('text', 'clear sky');
      forecast.should.have.property('conditions', 'Clear');
      forecast.should.have.property('snow', 0);
      forecast.should.have.property('temperature').with.type('object');
      forecast.temperature.should.have.property('max', 26);
      forecast.temperature.should.have.property('min', 26);
      forecast.should.have.property('notice', {
        href: 'https://openweathermap.org/city/5234158',
        img: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg',
        width: 160,
        site: 'openweathermap.org'
      });
      done(err);
    });
  });

});
