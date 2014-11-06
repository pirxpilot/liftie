var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:crystal-mountain');

var states = ['open', 'closed'];

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#tablepress-12 tbody tr', function(node) {
    var name = domutil.childText(node, 1),
      status = parseInt(domutil.childText(node, '2/0'), 10);

    if (isNaN(status)) {
      return;
    }

    return {
      name: name,
      status: states[status - 1] || 'scheduled'
    };
  });

  debug('Crystal Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
