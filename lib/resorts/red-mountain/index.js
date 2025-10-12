import coerce from '../../tools/coerce.js';
export default parse;

function parse(data) {
  const lifts = data?.MountainReport?.Lifts ?? [];
  const liftStatus = {};
  lifts.forEach(({ Name, Status }) => (liftStatus[Name] = coerce(Status)));
  return liftStatus;
}
