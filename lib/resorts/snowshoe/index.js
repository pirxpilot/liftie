var collect = require('../../tools/domutil').collect;
var debug = require('debug')('liftie:resort:snowshoe');

function parse(dom) {
  var liftStatus = collect(dom, '#statusTablesLift tbody tr', {
    name: 0,
    status: 2
  });

  debug('Snowshoe Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
