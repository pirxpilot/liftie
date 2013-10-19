var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:snowshoe');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#statusTablesLift tbody tr').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.children[2].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Snowshoe Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
