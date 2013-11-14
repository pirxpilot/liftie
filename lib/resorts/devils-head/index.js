var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:devils-head');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.liftTable img', function(node) {
    var td = node.parent;
    return {
      name: domutil.childText(td.prev, 0),
      status: domutil.childText(td.next, 0)
    };
  });

  debug('Devils Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
