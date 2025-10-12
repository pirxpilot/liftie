import Debug from 'debug';
import coerce from '../../tools/coerce.js';

const debug = Debug('liftie:resort:jackson-hole');

export default parse;

function parse(data) {
  const liftStatus = {};

  Object.values(data.lifts).forEach(({ name, openingStatus }) => {
    liftStatus[name] = coerce(openingStatus);
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
