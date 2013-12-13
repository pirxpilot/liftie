var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:cranmore-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#snowreport-tabs-1 td[scope="row"]', function(node) {
    var name = domutil.childText(node, 0);
    if (!name) {
      return;
    }
    return {
      name: name.trim(),
      status: node.next.children.length ? 'open' : 'closed'
    };
  });

  debug('Cranmore Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
