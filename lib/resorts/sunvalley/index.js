var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:sunvalley');

function parse(dom) {
  var liftStatus = {},
   liftNameRegex = /#\d+\s+(\w.+)/; // to strip #01 prefixes

  select(dom, '.label.lift').forEach(function(node) {
    var name = node.children[1].data,
      status, match;
    status = node.next.children[0] ? 'open' : 'closed';
    match = name.match(liftNameRegex);
    if (!match) {
      return;
    }
    name = match[1];
    liftStatus[name] = coerce(status);
  });

  debug('Sun Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
