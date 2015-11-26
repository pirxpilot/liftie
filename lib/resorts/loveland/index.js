var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:loveland');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.tablepress-table-name', function(node) {
    var ns = domutil.findText(node).split(' &#8211; ');
    return {
      name: ns[0],
      status: ns[1]
    };
  });

  debug('Loveland Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
