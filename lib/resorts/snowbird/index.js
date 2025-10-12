import coerce from '../../tools/coerce.js';
export default parse;

function parse(lifts) {
  return Object.fromEntries(lifts.map(({ name, status }) => [name, coerce(status)]));
}
