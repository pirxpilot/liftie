const assert = require('assert');
const noaa = require('../../lib/weather/noaa');

require('../replay');

/*global describe, it*/

describe('noaa', function() {

  it('should return empty forecast if location is missing', function(done) {
    noaa({
      ll: [0, 0]
    }, function(err, forecast) {
      assert.ifError(err);
      assert.ok(!forecast);
      done();
    });
  });


  it('should return forecast for valid location', function(done) {
    noaa({
      // Killington, VT
      noaa: 'BTV/107,21',
      ll: [-72.7933, 43.6647]
    }, function(err, forecast) {
      assert.ifError(err);
      assert.ok(forecast);
      assert.deepEqual(forecast.icon, ['icon-cloud', 'icon-sunny']);
      assert.equal(forecast.date, '2019-01-02');
      assert.equal(forecast.text, 'Partly sunny, with a high near 25. East wind around 3 mph.');
      assert.equal(forecast.conditions, 'Partly Sunny');
      assert.equal(typeof forecast.temperature, 'object');
      assert.equal(forecast.temperature.max, 25);
      done(err);
    });
  });

});
