var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:big-sky');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts table tr', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.children[1].attribs.class
    };
  });

  debug('Big Sky Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
