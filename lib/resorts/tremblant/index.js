var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:tremblant');


function parse(dom) {
  var liftStatus = domutil.collect(dom, '#statusTablesLift tbody tr', {
    name: 0,
    status: 2
  });

  debug('Mont Tremblant Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
