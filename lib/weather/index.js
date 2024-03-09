const openweather = require('./openweather');
const noaa = require('./noaa');
const { hour } = require('../tools/millis');

module.exports = fetch;
module.exports.interval = {
  active: 2 * hour, // once every 2 hours for active resorts
  inactive: Number.POSITIVE_INFINITY // don't fetch on inactive
};

// see: https://openweathermap.org/forecast5
const { OPENWEATHER_API_KEY } = process.env;

function fetch(resort, fn) {
  if (resort.noaa) {
    noaa(resort, fn);
  } else if (OPENWEATHER_API_KEY) {
    openweather(resort, OPENWEATHER_API_KEY, fn);
  } else {
    fn('no service configured');
  }
}
