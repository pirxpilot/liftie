var wunderground = require('./wunderground'),
  hour = require('../tools/millis').hour;

module.exports = fetch;
module.exports.interval = {
  active: 8 * hour, // once every 8 hours for active resorts
  inactive: Infinity // don't fetch on inactive
};

function fetch(resort, fn) {
  wunderground(resort, fn);
}
