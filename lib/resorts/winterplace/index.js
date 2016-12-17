var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:winterplace');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.row:nth-child(n + 7) td:nth-child(2n + 1)', function(node) {
    var name = domutil.childText(node, '0');
    if (!name) {
      return;
    }
    if (!name.startsWith('Lift')) {
      return;
    }
    return {
      name: name.slice(5),
      status: domutil.childText(node.next, '0')
    };
  });

  debug('Winterplace Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
