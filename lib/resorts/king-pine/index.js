import Debug from 'debug';
import coerce from '../../tools/coerce.js';

const debug = Debug('liftie:resort:king-pine');

export default parse;

function parse({ lifts }) {
  const liftStatus = {};

  lifts.forEach(({ name, status }) => {
    if (status) {
      liftStatus[name] = coerce(status);
    }
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
