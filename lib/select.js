import { selectAll } from 'css-select';

// select we were using before had reverse order of the parameters
export default function select(dom, selector) {
  return selectAll(selector, dom);
}
