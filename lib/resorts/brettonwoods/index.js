const select = require('../../select');
const coerce = require('../../tools/coerce');
const domutil = require('../../tools/domutil');
const debug = require('debug')('liftie:resort:brettonwoods');

function parse(dom) {
  const liftStatus = {};

  select(dom, '#trail-content > div:nth-of-type(-n + 2)').forEach((div) => {
    let name;
    let status;

    div.children.forEach((node) => {
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

module.exports = parse;
