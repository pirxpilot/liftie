const test = require('tape');
const openweather = require('../../lib/weather/openweather');

require('../replay');

test('openweather should return forecast', function(t) {
  openweather({
    // Killington, VT
    ll: [-72.7933, 43.6647]
  }, 'testkey', function(err, forecast) {
    t.error(err);
    t.ok(forecast);
    t.deepEqual(forecast.icon, [ 'basenone', 'icon-moon' ]);
    t.equal(forecast.date, '2019-01-05');
    t.equal(forecast.text, 'clear sky');
    t.equal(forecast.conditions, 'Clear');
    t.equal(forecast.snow, 0);
    t.equal(typeof forecast.temperature, 'object');
    t.equal(forecast.temperature.max, 26);
    t.equal(forecast.temperature.min, 26);
    t.deepEqual(forecast.notice, {
      href: 'https://openweathermap.org/city/5234158',
      img: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg',
      width: 160,
      site: 'openweathermap.org'
    });
    t.end();
  });
});
