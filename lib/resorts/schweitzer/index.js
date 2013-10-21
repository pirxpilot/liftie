var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:schweitzer');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#liftsOpenStatus .liftIcon').forEach(function(node) {
    var match,
      name = node.next.children[0].data,
      status = node.attribs.class;

    match = status.match(/\bstatus(\S+)\b/);
    status = match ? match[1] : 'Closed';

    liftStatus[name] = coerce(status);
  });

  debug('Schweitzer Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
