var wunderground = require('./wunderground'),
  opensnow = require('./opensnowapi'),
  hour = require('../tools/millis').hour;

module.exports = fetch;
module.exports.interval = {
  active: 8 * hour, // once every 8 hours for active resorts
  inactive: Infinity // don't fetch on inactive
};

function fetch(resort, fn) {
  opensnow(resort, function (err, data) {
    if (err || data) {
      return fn(err, data);
    }
    wunderground(resort, fn);
  });
}
