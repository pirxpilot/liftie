var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:burke-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#lifts tbody tr', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: domutil.child(node, '1/0').attribs.class
    };
  });

  debug('Burke Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
