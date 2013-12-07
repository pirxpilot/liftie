var collect = require('../../tools/domutil').collect;
var debug = require('debug')('liftie:resort:diamondpeak');

function parse(dom) {
  // skip last 2 rows - terrain park
  var liftStatus = collect(dom, '.lift-trail-wrapper .row:nth-last-child(n+3) .lift-header');

  debug('Diamond Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
