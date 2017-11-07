var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:tahoe-donner');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'h2:contains(LIFT STATUS) + table tr:not(:first-child)');

  debug('Tahoe Donner Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
