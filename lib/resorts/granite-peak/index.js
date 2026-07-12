import { allText } from '../../tools/domutil.js';

// each lift renders as <details> with a lift-title row; the status icon div
// carries title="open"/"closed" (occasionally a raw term id, coerced away)
export default {
  selector: 'div.lift-title',
  parse: {
    name: node => allText(node),
    status: {
      child: '0/0',
      attribute: 'title'
    }
  }
};
