const wunderground = require('./wunderground');
const noaa = require('./noaa');
const { hour } = require('../tools/millis');

module.exports = fetch;
module.exports.interval = {
  active: 8 * hour, // once every 8 hours for active resorts
  inactive: Infinity // don't fetch on inactive
};

function fetch(resort, fn) {
  noaa(resort, function (err, data) {
    if (err || data) {
      return fn(err, data);
    }
    wunderground(resort, fn);
  });
}
