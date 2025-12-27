import Debug from 'debug';
import select from '../../select.js';
import * as domutil from '../../tools/domutil.js';

const debug = Debug('liftie:resort:brettonwoods');

/**
 * New format (2024+): Structured HTML with trail-reports__table-item elements
 * Structure: <li data-status="open/closed"><div class="trail-reports__table-item--name">Name</div>...</li>
 */
export default function parse(dom) {
  const liftStatus = {};

  // Find the lifts section - look for accordion items containing lift data
  // The lifts are in li elements with class "trail-reports__table-item"
  select(dom, '.trail-reports__lifts .trail-reports__table-item').forEach(li => {
    // Get status from data-status attribute
    const status = li.attribs?.['data-status'];
    if (!status) return;

    // Find the name element
    const nameDiv = select(li, '.trail-reports__table-item--name')[0];
    if (!nameDiv) return;

    const name = domutil.findText(nameDiv);
    if (name) {
      liftStatus[name.trim()] = status;
    }
  });

  debug('New format Bretton Woods Lift Status:', liftStatus);
  return liftStatus;
}
