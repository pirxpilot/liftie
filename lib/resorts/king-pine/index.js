const coerce = require('../../tools/coerce');
const debug = require('debug')('liftie:resort:king-pine');

module.exports = parse;

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
