var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:big-white');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#lift .lift-item', function(node) {
    return {
      name: domutil.childText(node, 0).trim().slice(0, -2),
      status: domutil.child(node, '1/0').attribs.alt
    };
  });

  debug('Big White Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
