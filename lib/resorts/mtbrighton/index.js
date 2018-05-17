var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mtbrighton');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'table:nth-of-type(5) tr:not(:first-child)', function(node) {
    return {
      name: domutil.childText(node, '0/0'),
      status: domutil.childText(node, '2/0')
    };
  });

  debug('Mt Brighton Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
