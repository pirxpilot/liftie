var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:soelden');

function parse(dom) {
  var liftStatus = {},
    statusArr = ['closed', 'open', 'hold'];

  select(dom, '#templ-liftoverview td[data-label="Name"]').forEach(function(node) {
    var name = select(node, 'h2')[0].children[0].data,
      status = select(node.prev, '.statustext')[0].children[0].data;
    liftStatus[name] = coerce(statusArr[status]);
  });

  debug('Sölden Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
