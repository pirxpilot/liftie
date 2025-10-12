import Debug from 'debug';
import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import * as domutil from '../../tools/domutil.js';

const debug = Debug('liftie:resort:brettonwoods');

function parse(dom) {
  const liftStatus = {};

  select(dom, '#trail-content > div:nth-of-type(-n + 2)').forEach(div => {
    let name;
    let status;

    div.children.forEach(node => {
      if (node.type === 'text') {
        name = domutil.findText(node);
        if (name) {
          name = name.trim().replace(/\s+High-Speed Quad$/, '');
        }
      } else if (node.type === 'tag' && node.name === 'span') {
        status = node.attribs.class || 'open';
        if (name) {
          liftStatus[name] = coerce(status);
          name = undefined;
        }
      }
    });
  });

  debug('Bretton Woods Lift Status:', liftStatus);
  return liftStatus;
}

export default parse;
