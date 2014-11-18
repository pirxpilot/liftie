var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mthood');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-operations .table-status-chart tbody tr', {
    name: 1,
    status: 0
  });

  debug('Mount Hood Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
