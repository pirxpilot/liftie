const coerce = require('./coerce');
const debug = require('debug')('liftie:resort:boyne');

module.exports = parse;

function parse(data) {
  const liftStatus = {};

  data.forEach(({ name, status }) => {
    liftStatus[name] = coerce(status);
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
