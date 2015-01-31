var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:meribel');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.rm', function(node) {
    return {
      name: domutil.childText(node, 2),
      status: domutil.child(node, 0).attribs.class.split(' ').pop()
    };
  });

  debug('Meribel Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
