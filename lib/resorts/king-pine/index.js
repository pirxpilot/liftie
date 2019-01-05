const coerce = require('../../tools/coerce');
const debug = require('debug')('liftie:resort:king-pine');

module.exports = parse;

function parse({ lifts }) {
  var liftStatus = {};

  lifts.forEach(function ({ name,  status }) {
    if (status) {
      liftStatus[name] = coerce(status);
    }
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
