var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:tahoe-donner');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#lift-status.last-child li', function(node) {
    var status = node.attribs.class;
    if (status === 'def') {
      return;
    }
    if (status === 'summer') {
      status = 'hold';
    }
    return {
      name: domutil.childText(node, 0),
      status: status
    };
  });

  debug('Tahoe Donner Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
