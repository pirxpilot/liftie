var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mthigh');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#block-mthigh_conditions-lift-report td.name', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.next.children[0].attribs.class
    };
  });

  debug('Mountain High Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
