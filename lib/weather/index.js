const wunderground = require('./wunderground');
const noaa = require('./noaa');
const { hour } = require('../tools/millis');

module.exports = fetch;
module.exports.interval = {
  active: 2 * hour, // once every 2 hours for active resorts
  inactive: Infinity // don't fetch on inactive
};

function fetch(resort, fn) {
  if (resort.noaa) {
    noaa(resort, fn);
  } else {
    wunderground(resort, fn);
  }
}
