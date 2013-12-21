var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:burke-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#mainContent table:nth-of-type(3) tr:nth-child(n + 5)', function(node) {
    return {
      name: domutil.findText(node.children[0]),
      status: domutil.findText(node.children[1]).split(' ')[0]
    };
  });

  debug('Burke Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
