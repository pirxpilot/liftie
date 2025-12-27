import Debug from 'debug';
import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import * as domutil from '../../tools/domutil.js';

const debug = Debug('liftie:resort:brettonwoods');

/**
 * Parse Bretton Woods lift status
 * Supports both old format (pre-2024) and new format (2024+)
 */
function parse(dom) {
  // Try new format first (2024+ website with structured HTML)
  const newFormatResults = parseNewFormat(dom);
  if (Object.keys(newFormatResults).length > 0) {
    debug('Using new format parser');
    return newFormatResults;
  }

  // Fall back to old format (#trail-first, #trail-second divs)
  debug('Using old format parser');
  return parseOldFormat(dom);
}

/**
 * New format (2024+): Structured HTML with trail-reports__table-item elements
 * Structure: <li data-status="open/closed"><div class="trail-reports__table-item--name">Name</div>...</li>
 */
function parseNewFormat(dom) {
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

/**
 * Old format: #trail-first and #trail-second divs with text + span elements
 * Example: "Zephyr High-Speed Quad <span class='close'>(Closed)</span>"
 */
function parseOldFormat(dom) {
  const liftStatus = {};

  select(dom, '#trail-first, #trail-second').forEach(div => {
    let name;

    div.children.forEach(node => {
      if (node.type === 'text') {
        const text = domutil.findText(node);
        if (text) {
          name = text.trim().replace(/\s+High-Speed Quad$/, '');
        }
      } else if (node.type === 'tag' && node.name === 'span') {
        const status = node.attribs.class || 'open';
        if (name) {
          liftStatus[name] = coerce(status);
          name = undefined;
        }
      }
    });
  });

  debug('Old format Bretton Woods Lift Status:', liftStatus);
  return liftStatus;
}

export default parse;
