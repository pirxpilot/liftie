var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:devils-head');


function fixName(name) {
  return name
    .replace(/\*+/g, '')
    .replace(' &frac12;', '½')
    .replace(' &frac14;', '¼')
    .trim();
}

function parse(dom) {
  var liftStatus, liftTable;

  liftTable = select(dom, 'h3').filter(function(node) {
    return 'Lift Status' === domutil.findText(node);
  }).pop().next;

  liftStatus = domutil.collect(liftTable, 'img', function(node) {
    var td = node.parent;
    return {
      name: fixName(domutil.childText(td, 1)),
      status: domutil.childText(td.next, 0)
    };
  });

  debug('Devils Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
