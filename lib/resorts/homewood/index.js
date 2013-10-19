var select = require('../../select');
var coerce = require('../../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift_header h4').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.attribs['class'];
    liftStatus[name] = coerce(status, 'lift_status_'.length);
  });

  return liftStatus;
}

module.exports = parse;
