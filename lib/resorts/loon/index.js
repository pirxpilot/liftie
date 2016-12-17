var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:loon');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'div.row:nth-child(2) .lift-status tr:nth-child(n + 2)', function(node) {
    var name = domutil.childText(node, 0);
    if (!name) {
      return;
    }
    return {
      name: name,
      status: domutil.child(node, '1/0').attribs.src.split('-')[1]
    };
  });

  debug('Loon Lift Status:', liftStatus);

  return liftStatus;
}

module.exports = parse;
