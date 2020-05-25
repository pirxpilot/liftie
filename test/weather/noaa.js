const test = require('tape');
const noaa = require('../../lib/weather/noaa');

require('../replay');

test('noaa should return empty forecast if location is missing', function(t) {
  noaa({
    ll: [0, 0]
  }, function(err, forecast) {
    t.error(err);
    t.notOk(forecast);
    t.end();
  });
});

test('noaa should return forecast for valid location', function(t) {
  noaa({
    // Killington, VT
    noaa: 'BTV/107,21',
    ll: [-72.7933, 43.6647]
  }, function(err, forecast) {
    t.error(err);
    t.ok(forecast);
    t.deepEqual(forecast.icon, ['icon-cloud', 'icon-sunny']);
    t.equal(forecast.date, '2019-01-02');
    t.equal(forecast.text, 'Partly sunny, with a high near 25. East wind around 3 mph.');
    t.equal(forecast.conditions, 'Partly Sunny');
    t.equal(typeof forecast.temperature, 'object');
    t.equal(forecast.temperature.max, 25);
    t.end();
  });
});
