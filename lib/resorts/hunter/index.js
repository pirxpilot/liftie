var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:hunter');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#all-lifts---trails .sr-status:nth-child(3) li span', function(node) {
    return {
      name: domutil.childText(node, 1),
      status: domutil.child(node, 0).attribs.alt
    };
  });

  debug('Hunter Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
