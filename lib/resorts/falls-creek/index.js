const coerce = require('../../tools/coerce');
const debug = require('debug')('liftie:resort:falls-creek');

module.exports = parse;

function parse({ Lifts: { Lift } }) {
  const liftStatus = {};

  Lift.forEach(({ LiftName, LiftStatusMorning }) => {
    liftStatus[LiftName] = coerce(LiftStatusMorning);
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
