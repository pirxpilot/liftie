var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:whiteface');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.trail-conditions .lift-label').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.next.children[0].attribs.class.split(' ');
    status = status[status.length - 1];
    liftStatus[name] = coerce(status);
  });

  debug('Whiteface Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
