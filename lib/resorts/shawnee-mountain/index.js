const debug = require("debug")("liftie:resort:shawnee-mountain");

module.exports = parse;

function parse({ addtl: { lifts } }) {
  const liftStatus = {};

  Object.values(lifts).forEach(
    ({ friendly, open }) => liftStatus[friendly] = open ? 'open' : 'closed'
  );

  debug("Lift Status", liftStatus);
  return liftStatus;
}
