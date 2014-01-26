var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mountsnow');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.sr-lift', function(node) {
    var name, match;

    name = domutil.childText(node, 0);
    match = name.match(/^#\d+\s+(.+)$/);
    if (!match) {
      return;
    }

    return {
      name: match[1],
      status: domutil.child(node.next, 0).attribs.class
    };
  });

  debug('Mount Snow Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
