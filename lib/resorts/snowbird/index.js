const coerce = require('../../tools/coerce');

module.exports = parse;

function parse(lifts) {
  return Object.fromEntries(
    lifts.map(({ name, status }) => [name, coerce(status)])
  );
}
