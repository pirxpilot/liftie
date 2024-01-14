const debug = require('debug')('liftie:resort:aspen');
const coerce = require('./coerce');

module.exports = parse;

function parse(data) {
  const liftStatus = {};

  data.liftStatuses.forEach((lift) => {
    liftStatus[lift.liftName] = coerce(lift.status);
  });

  debug('Aspen Lift Status:', liftStatus);
  return liftStatus;
}
