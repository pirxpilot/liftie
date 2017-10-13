var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:big-sky');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.snow-section:first-child li', function(node) {
    return {
      name: domutil.childText(node, 2),
      status: domutil.child(node, '0/0').attribs.alt
    };
  });

  debug('Big Sky Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
