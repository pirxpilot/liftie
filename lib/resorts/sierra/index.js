var select = require('../../select');
var coerce = require('../../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#block-sierra_conditions-lift-report td img').forEach(function(img) {
    var td, name, status;
    td = img.parent;
    name = td.children[1].data;
    status = td.next.children[0].data;
    liftStatus[name] = coerce(status);
  });

  return liftStatus;
}

module.exports = parse;
