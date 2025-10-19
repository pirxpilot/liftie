import Debug from 'debug';
import coerce from './coerce.js';

const debug = Debug('liftie:resort:aspen');

export default function parse(data) {
  const liftStatus = {};

  data.liftStatuses.forEach(lift => {
    liftStatus[lift.liftName] = coerce(lift.status);
  });

  debug('Aspen Lift Status:', liftStatus);
  return liftStatus;
}
