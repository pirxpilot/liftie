import coerce from '../../tools/coerce.js';
export default parse;

function parse(data) {
  const { lifts = [] } = data?.report?.facilities ?? {};
  return lifts.reduce((ls, { name, statuses }) => {
    ls[name] = coerce(statuses[0]);
    return ls;
  }, {});
}
