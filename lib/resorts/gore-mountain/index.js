var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:gore-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-conditions-mountain-section-container .lift-label', function(node) {
    return {
      name: domutil.findText(node),
      status: node.next.children[0].attribs.class.split(' ').pop()
    };
  });

  debug('Gore Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
