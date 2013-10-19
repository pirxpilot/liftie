var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:alta');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.tablerowwhite img').forEach(function(node) {
    var name = node.parent.prev.children[0].children[0].data,
      status = node.attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Alta Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
