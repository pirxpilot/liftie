var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:crested-butte');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'table.category.large tr').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Crested Butte Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
