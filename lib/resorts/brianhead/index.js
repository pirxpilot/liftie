const debug = require('debug')('liftie:resort:brianhead');
const coerce = require('../../tools/coerce');

module.exports = parse;

function parse(data) {
  const lifts = data?.w153_acf_option_bh_lft_lifts ?? [];
  const liftStatus = {};

  lifts.forEach(
    ({ name, status }) => liftStatus[name] = coerce(status.label)
  );

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
