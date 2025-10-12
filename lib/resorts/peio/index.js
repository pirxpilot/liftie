import { allText } from '../../tools/domutil.js';

const STATUS = {
  check: 'open',
  times: 'closed'
};

export default {
  selector: '.installations tr:not(:first-child)',
  parse: {
    name: node => allText(node.children?.[1]),
    status: {
      child: '2/0',
      attribute: 'class',
      regex: /fa-([a-z]+)/,
      fn: s => STATUS[s]
    }
  }
};
