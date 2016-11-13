var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:shawnee-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'strong img[alt$="Lift"]', function(node) {
    return {
      name: domutil.childText(node.parent, 1),
      status: node.parent.parent.next.children[0].attribs.alt
    };
  });

  debug('Shawnee Mountain Ski Area Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
