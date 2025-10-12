import Debug from 'debug';
import select from '../select.js';
import * as domutil from './domutil.js';

const debug = Debug('liftie:resort:infosnow');

export default function parse(dom) {
  const nodes = select(dom, '.block table tr');
  let liftStatus;

  nodes.some(node => {
    if (domutil.childText(node, 0).split(' ').shift() !== 'Lifts') {
      return;
    }
    liftStatus = domutil.collect(node.parent.parent.parent, '.content table tr .icon[src*="status"]', node => ({
      name: node.parent.next.next.children[0].data,
      status: node.attribs.src.split('/').pop().slice(0, -4)
    }));
    return true;
  });

  debug('Infosnow APGSGA Lift Status:', liftStatus);
  return liftStatus;
}
