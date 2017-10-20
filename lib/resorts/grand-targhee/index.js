var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:grand-targhee');

function parse(dom) {
// .table-wrapper:nth-child(2) th
  var liftStatus = domutil.collect(dom, '.table:first-of-type th', function(node) {
    if (node.children.length < 2) {
      return;
    }
    return {
      name: domutil.childText(node, 1),
      status: domutil.child(node, 0).attribs.class.split(' ').pop()
    };
  });

  debug('Grand Targhee Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
