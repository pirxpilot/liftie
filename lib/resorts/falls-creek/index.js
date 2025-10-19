import Debug from 'debug';
import coerce from '../../tools/coerce.js';

const debug = Debug('liftie:resort:falls-creek');

export default parse;

function parse({ Lifts: { Lift } }) {
  const liftStatus = {};

  Lift.forEach(({ LiftName, LiftStatusMorning }) => {
    liftStatus[LiftName] = coerce(LiftStatusMorning);
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
