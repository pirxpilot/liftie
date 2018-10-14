const coerce = require('./coerce');
const debug = require('debug')('liftie:resort:powdr');

module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data
    .filter(({ type }) => type === 'lift')
    .forEach(function ({ properties: { name },  status }) {
      const si = status.find(({ status_name }) => status_name === 'opening');
      if (si) {
        liftStatus[name] = coerce(si.status_value);
      }
    });

    debug('Lift Status:', liftStatus);
    return liftStatus;
}
