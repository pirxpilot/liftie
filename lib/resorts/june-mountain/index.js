const coerce = require('../../tools/coerce');

const debug = require('debug')('june-mountain');

module.exports = parse;

function parse(data) {
  const liftStatus = {};
  const areas = data?.MountainAreas ?? [];
  areas.forEach(area => {
    const lifts = area.Lifts ?? [];
    lifts.forEach(item => liftStatus[ item.Name ] = coerce(item.Status));
  });
  debug(`Lift Status:`, liftStatus);
  return liftStatus;
}
