var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:schweitzer');

function parse(dom) {
  var liftStatus = {};

  var statusTable = select(dom, 'table caption').filter(function(node) {
    return 'Chair Lifts' === node.children[0].data;
  })[0];

  select(statusTable.next, 'td').forEach(function(node) {
    if (!node.children || node.children.length != 2) {
      return;
    }
    var name = node.children[1].data.trim(),
      status = node.children[0].attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Schweitzer Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
