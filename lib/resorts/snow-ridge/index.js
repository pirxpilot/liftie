import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText, findText } from '../../tools/domutil.js';

// hand-posted report: trail rows and lift rows share one table, separated
// by a marker row containing <h2>Lift Report</h2>; off season there is no table
export default function parse(dom) {
  const liftStatus = {};
  let inLifts = false;
  for (const row of select(dom, 'table tr')) {
    const tds = row.children.filter(c => c.name === 'td');
    if (!inLifts) {
      inLifts = tds.some(td => td.children.some(c => c.name === 'h2' && /lift report/i.test(findText(c) ?? '')));
      continue;
    }
    if (tds.length !== 2) {
      break;
    }
    const name = allText(tds[0]).trim();
    const status = findText(tds[1]);
    if (name && status) {
      liftStatus[name] = coerce(status);
    }
  }
  return liftStatus;
}
