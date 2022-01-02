const debug = require("debug")("liftie:resort:bridger-bowl");

const coerce = require('../../tools/coerce');

module.exports = parse;

function parse({ data } = {}) {
  const ls = data?.lift_status ?? [];
  const liftStatus = {};
  ls.forEach(
    ({ display_name, status }) => liftStatus[display_name] = coerce(status)
  );
  debug("Lift Status", liftStatus);
  return liftStatus;
}
