const coerce = require('../../tools/coerce');

module.exports = parse;

function parse(data) {
  const lifts = data?.MountainReport?.Lifts ?? [];
  const liftStatus = {};
  lifts.forEach(({ Name, Status }) => liftStatus[Name] = coerce(Status));
  return liftStatus;
}
