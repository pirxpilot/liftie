import Debug from 'debug';

const debug = Debug('liftie:resort:shawnee-mountain');

export default parse;

function parse({ addtl: { lifts } }) {
  const liftStatus = {};

  Object.values(lifts).forEach(({ friendly, open }) => (liftStatus[friendly] = open ? 'open' : 'closed'));

  debug('Lift Status', liftStatus);
  return liftStatus;
}
