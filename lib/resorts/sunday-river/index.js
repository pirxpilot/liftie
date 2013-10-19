var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:sunday-river');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '.data_table .lift').forEach(function(node) {
    var name = node.parent.prev.children[0].children[0].data,
      status = node.children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Sunday River Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
