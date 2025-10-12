import Debug from 'debug';

const debug = Debug('liftie:resort:bridger-bowl');

import coerce from '../../tools/coerce.js';
export default parse;

function parse({ data } = {}) {
  const ls = data?.lift_status ?? [];
  const liftStatus = {};
  ls.forEach(({ display_name, status }) => (liftStatus[display_name] = coerce(status)));
  debug('Lift Status', liftStatus);
  return liftStatus;
}
