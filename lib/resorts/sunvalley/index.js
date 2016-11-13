var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sunvalley');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-listing .asset-container .asset');

  debug('Sun Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
