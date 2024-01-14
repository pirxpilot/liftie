const coerce = require('../../tools/coerce');

module.exports = parse;

function parse(data) {
  const { lifts = [] } = data?.report?.facilities ?? {};
  return lifts.reduce((ls, { name, statuses }) => {
    ls[name] = coerce(statuses[0]);
    return ls;
  }, {});
}
