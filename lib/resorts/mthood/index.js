var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:mthood');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#lift-operations tbody th .icon').forEach(function(node) {
    var name = node.children[0].data,
      status = node.parent.attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Mount Hood Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
