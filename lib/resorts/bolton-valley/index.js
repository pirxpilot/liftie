var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:bolton-valley');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#trailReport td[colspan="6"] strong', function(node) {
    var ns = domutil.childText(node, 0).split(/\s+-\s+/);
    return {
      name: ns[0],
      status: ns[1]
    };
  });

  debug('Bolton Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
