var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mountsnow');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-wrapper .report-lift', function(node) {
    var name, match;

    name = domutil.childText(node, 1);
    match = name.match(/^#\d+\s+(.+)$/);
    if (!match) {
      return;
    }

    return {
      name: match[1],
      status: domutil.child(node, '0/0').attribs.class.split('-').pop()
    };
  });

  debug('Mount Snow Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
