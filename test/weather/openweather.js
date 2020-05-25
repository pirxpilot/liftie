const assert = require('assert');
const openweather = require('../../lib/weather/openweather');

/*global describe, it */

describe('openweather', function() {
  it('should return forecast', function(done) {
    openweather({
      // Killington, VT
      ll: [-72.7933, 43.6647]
    }, 'testkey', function(err, forecast) {
      assert.ifError(err);
      assert.ok(forecast);
      assert.deepEqual(forecast.icon, [ 'basenone', 'icon-moon' ]);
      assert.equal(forecast.date, '2019-01-05');
      assert.equal(forecast.text, 'clear sky');
      assert.equal(forecast.conditions, 'Clear');
      assert.equal(forecast.snow, 0);
      assert.equal(typeof forecast.temperature, 'object');
      assert.equal(forecast.temperature.max, 26);
      assert.equal(forecast.temperature.min, 26);
      assert.deepEqual(forecast.notice, {
        href: 'https://openweathermap.org/city/5234158',
        img: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg',
        width: 160,
        site: 'openweathermap.org'
      });
      done(err);
    });
  });

});
