var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:cataloochee');

function parse(dom) {
  var liftStatus, start = -1;

  liftStatus = domutil.collect(dom, 'table.text td:first-child', function(node) {
    var tr;
    if (start < 0) {
      if ('Lift Name' === domutil.childText(node, 0)) {
        start = 4; // start looking for lift names
      }
      return;
    }
    if (node.attribs.colspan) {
      return;
    }
    start -= 1;
    tr = node.parent;
    return {
      name: domutil.childText(tr, 1).split(' ').slice(0, -2).join(' '),
      status: domutil.childText(tr, 2)
    };
  });

  debug('Cataloochee Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
