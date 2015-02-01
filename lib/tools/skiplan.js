var domutil = require('./domutil');
var debug = require('debug')('liftie:resort:skiplan');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.rm', function(node) {
    return {
      name: domutil.childText(node, 2),
      status: domutil.child(node, 0).attribs.class.split(' ').pop()
    };
  });

  debug('Lumiplan Lift Status:', liftStatus);
  return liftStatus;
}
module.exports = parse;
