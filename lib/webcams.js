var debug = require('debug')('liftie:webcams');
var day = require('./tools/millis').day;

module.exports = fetch;
module.exports.interval = {
  active: day,
  inactive: Infinity
};

function fetch(resort, fn) {
  var webcams;
  debug("Fetching webcams for %s", resort.id);
  if (resort.webcams && resort.webcams.length) {
    webcams = resort.webcams;
  }
  process.nextTick(fn.bind(null, null, webcams));
}
