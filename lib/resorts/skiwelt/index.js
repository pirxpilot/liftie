import coerce from '../../tools/coerce.js';

export default function parse(data = {}) {
  const { items = [] } = data;
  return items.reduce((ls, { title, state }) => {
    ls[title] = coerce(state);
    return ls;
  }, {});
}
