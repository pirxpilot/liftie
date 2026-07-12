import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// trail status page is a grid of elementor headings flowing in triplets:
// trail name, status (Open/Closed), snowmaking state - no per-lift data
export default function parse(dom) {
  const liftStatus = {};
  let name;
  for (const node of select(dom, 'h3.elementor-heading-title')) {
    const text = allText(node).replace(/[​\s]+/g, ' ').trim();
    if (/^(open|closed)$/i.test(text)) {
      if (name) {
        liftStatus[name] = text.toLowerCase();
        name = undefined;
      }
    } else if (text && !/(trail status|snowmaking)$/i.test(text)) {
      name = text;
    }
  }
  return liftStatus;
}
