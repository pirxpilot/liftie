var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:snowbasin');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-status', function(node) {
    return {
      name: domutil.childText(node, '1/0'),
      status: domutil.child(node, 0).attribs.class.split(' ').pop()
    };
  });

  debug('Snowbasin Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
