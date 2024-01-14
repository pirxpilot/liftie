const test = require('node:test');
const assert = require('node:assert/strict');
const noaa = require('../../lib/weather/noaa');

require('../replay');

test('noaa should return empty forecast if location is missing', (_t, done) => {
  noaa({
    ll: [0, 0]
  }, (err, forecast) => {
    assert.ifError(err);
    assert.ok(!forecast);
    done();
  });
});

test('noaa should return forecast for valid location', (_t, done) => {
  noaa({
    // Killington, VT
    noaa: 'BTV/107,21',
    ll: [-72.7933, 43.6647]
  }, (err, forecast) => {
    assert.ifError(err);
    assert.ok(forecast);
    assert.deepEqual(forecast.icon, ['icon-cloud', 'icon-sunny']);
    assert.equal(forecast.date, '2019-01-02');
    assert.equal(forecast.text, 'Partly sunny, with a high near 25. East wind around 3 mph.');
    assert.equal(forecast.conditions, 'Partly Sunny');
    assert.equal(typeof forecast.temperature, 'object');
    assert.equal(forecast.temperature.max, 25);
    done();
  });
});
