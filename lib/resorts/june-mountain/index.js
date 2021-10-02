const coerce = require('../../tools/coerce');

const debug = require('debug')('june-mountain');

module.exports = parse;

function parse(data) {
  const lifts = data?.MountainAreas?.[0].Lifts ?? [];
  const liftStatus = {};
  lifts.forEach(item => liftStatus[ item.Name ] = coerce(item.Status));
  debug(`Lift Status:`, liftStatus);
  return liftStatus;
}
