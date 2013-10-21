var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:kirkwood');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.space td[align="center"] img').forEach(function(node) {
    var match,
      td = node.parent,
      name = td.prev,
      status = td.next;

    if (!name || !status) {
      return;
    }

    name = name.children[0].data;
    status = status.children[0].data;
    match = name.match(/^#\d+\s+(.+)$/);

    if (match) {
      liftStatus[match[1]] = coerce(status);
    }
  });

  debug('Kirkwood Lift Status:', liftStatus);
  return liftStatus;
}


module.exports = parse;
