var select = require('../../select');
var coerce = require('../../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '.lift_and_trails_report td .lift-title').forEach(function(node) {
    var statusNode = node.parent.next.children[0],
      name = node.children[0].data.trim(),
      status = statusNode.attribs.class.split('-').pop();
    liftStatus[name] = coerce(status);
  });

  return liftStatus;
}

module.exports = parse;
