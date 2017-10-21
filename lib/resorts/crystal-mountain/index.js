var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:crystal-mountain');

var states = [
  'open',
  'closed',
  'hold',
  'hold',
  'scheduled'
];

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.row-hover tr', function(node) {
    var status = parseInt(domutil.childText(node, 2), 10);

    if (isNaN(status)) {
      return;
    }

    return {
      name: domutil.childText(node, 1),
      status: states[status - 1]
    };
  });

  debug('Crystal Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
