var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:alpine');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#lift_status_wrapper .lift-title').forEach(function(node) {
    var name = node.children[0].data,
      status = node.parent.prev.children[0].children[0].attribs.src;
    liftStatus[name] = coerce(status, 'lift_status_', '.png');
  });

  debug('Alpine Meadows Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
