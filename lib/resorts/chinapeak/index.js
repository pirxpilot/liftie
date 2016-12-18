var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:chinapeak');


function parse(dom) {
  var liftStatus = domutil.collect(dom, '.row.chair-bar', function(node) {
    return {
      name: domutil.childText(node, 0).trim().slice(0, -1),
      status: domutil.childText(node, 1)
    };
  });

  debug('China Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
