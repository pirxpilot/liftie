import coerce from '../../tools/coerce.js';
export default parse;

function parse({ winter }) {
  const ls = {};

  Object.values(winter).forEach(({ lifts }) => {
    Object.values(lifts).forEach(({ name, status }) => (ls[name] = coerce(status)));
  });

  return ls;
}
