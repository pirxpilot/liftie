var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:shawnee-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-stat.lift-name', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: domutil.childText(node.prev, 0)
    };
  });

  debug('Shawnee Mountain Ski Area Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
