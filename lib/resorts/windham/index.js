var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:windham');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#two td.trail', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.children[5].attribs.alt
    };
  });

  debug('Windham Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
