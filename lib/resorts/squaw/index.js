var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:squaw');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#block-lifts-lifts-table td .name').forEach(function(node) {
    var name, status;
    name = node.children[0].data;
    status = node.parent.prev.children[0].attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Squaw Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
