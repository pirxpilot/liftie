var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:alpine');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#lift_status_wrapper .lift-title').forEach(function(node) {
    var name = node.children[0].data,
      img = select(node.parent.prev, 'img')[0],
      status;
    status = img ? img.attribs.src.split('_').pop().slice(0, -4) : 'closed';
    liftStatus[name] = coerce(status);
  });

  debug('Alpine Meadows Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
