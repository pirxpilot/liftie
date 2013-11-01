var select = require('../../select');
var coerce = require('../../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#lift_and_trail_report-page th.lift_name').forEach(function(node) {
    var name = node.children[0].data.trim(),
      status = node.next.children[0].attribs.src;
    liftStatus[name] = coerce(status, status.lastIndexOf('/') + 1, -4);
  });

  return liftStatus;
}

module.exports = parse;
