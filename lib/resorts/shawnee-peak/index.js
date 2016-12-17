var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:shawnee-peak');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'ul.trailinfo:last-child li', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: domutil.child(node, '1/0').attribs.alt
    };
  });

  debug('Shawnee Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
