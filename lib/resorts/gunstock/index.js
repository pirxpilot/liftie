var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:gunstock');

function parse(dom) {
  var lifts, liftStatus = {};

  function parseLift(node) {
    var name = node.children[0].data.trim(),
      status = node.children[2].attribs.src;
    liftStatus[name] = coerce(status, status.lastIndexOf('-') + 1, -4);
  }

  lifts = select(dom, '.report-wrapper .trail-lift')[0];
  select(lifts, 'li').forEach(parseLift);

  debug('Gunstock Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
