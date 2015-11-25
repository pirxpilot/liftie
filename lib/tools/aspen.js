var debug = require('debug')('liftie:resort:aspen');
var coerce = require('./coerce');

module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data.liftStatuses.forEach(function(lift) {
    liftStatus[lift.liftName] = coerce(lift.status);
  });

  debug('Aspen Lift Status:', liftStatus);
  return liftStatus;
}
