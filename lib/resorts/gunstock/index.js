var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:gunstock');

function parse(dom) {
  function parseLift(node) {
    if (node.children.length != 3) {
      return;
    }
    return {
      name: domutil.childText(node, 0).split('-')[0].trim(),
      status: node.children[2].attribs.alt
    };
  }

  var
    lifts = select(dom, '.report-wrapper .trail-lift')[0],
    liftStatus = domutil.collect(lifts, 'li', parseLift);

  debug('Gunstock Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
