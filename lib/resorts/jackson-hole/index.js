const coerce = require('../../tools/coerce');
const debug = require('debug')('liftie:resort:jackson-hole');

module.exports = parse;

function parse(data) {
  var liftStatus = {};

  Object.values(data.lifts)
    .forEach(function ({ name, openingStatus }) {
      liftStatus[name] = coerce(openingStatus);
    });

    debug('Lift Status:', liftStatus);
    return liftStatus;
}
