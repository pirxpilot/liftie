var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:winter-park');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#statusTablesLift .statusTable tbody tr', function(node) {
    return {
      name: domutil.child(node, [0, 1]).data,
      status: domutil.childText(node, 2)
    };
  });

  debug('Winter Park Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
