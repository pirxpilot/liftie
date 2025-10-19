import Debug from 'debug';
import coerce from './coerce.js';

const debug = Debug('liftie:resort:boyne');

export default function parse(data) {
  const liftStatus = {};

  data.forEach(({ name, status }) => {
    liftStatus[name] = coerce(status);
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
