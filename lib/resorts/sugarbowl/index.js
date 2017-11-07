var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sugarbowl');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts_info', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.prev.children[0].attribs.alt
    };
  });

  debug('Sugar Bowl Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
