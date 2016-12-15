var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:monarch');


function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift tr:not(.lift-header)');

  debug('Monarch Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
