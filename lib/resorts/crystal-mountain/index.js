var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:crystal-mountain');

function style2status(style) {
  var st = ['open', 'hold', 'scheduled', 'closed'], index;
  index = parseInt(style.slice(-1), 10) - 1;
  return st[index];
}

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'tr[style] .lifts li[class^="lift_"]', function(node) {
    var name = domutil.childText(node, 0);
    // skip parks
    if (/^Sasquatch|^Southback/.test(name)) {
      return;
    }
    return {
      name: name,
      status: style2status(node.attribs.class)
    };
  });

  debug('Crystal Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
