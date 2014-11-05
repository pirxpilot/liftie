var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:jackson-hole');


function parse(dom) {
  var liftStatus = domutil.collect(dom, '.category-section:first-of-type .statusLabel', function(node) {
    return {
      name: domutil.childText(node, 1),
      status: node.children[0].attribs.class.split('_').pop()
    };
  });

  debug('Jackson Hole Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
