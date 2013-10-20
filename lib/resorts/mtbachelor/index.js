var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:mtbachelor');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift-box .lift-name').forEach(function(node) {
    var name, statusNode, status;
    statusNode = node.next && node.next.next;
    if(!statusNode || !statusNode.children[0]) {
      return;
    }
    name = node.children[1].children[0].data;
    status = statusNode.children[0].attribs.src;
    liftStatus[name] = coerce(status, status.lastIndexOf('/') + 1, -4);
  });

  debug('Mount Bachelor Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
