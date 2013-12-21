var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:jiminypeak');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.snowrpt tr td:first-child', function(node) {
    if (3 !== node.parent.children.length) {
      return;
    }

    return {
      name: domutil.childText(node, 0),
      status: domutil.child(node.next, 0).attribs.alt
    };
  });

  debug('Jiminy Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
