var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mad-river-glen');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'td:first-child', function(node) {
    var name = domutil.childText(node, 0);
    if (!name) {
      return;
    }
    if (node.attribs.class){
      return;
    }
    if (node.parent.children.length != 3) {
      return;
    }
    return {
      name: domutil.childText(node, 0),
      status: domutil.childText(node.next, 0) || 'closed'
    };
  });

  debug('Mad River Glen Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
