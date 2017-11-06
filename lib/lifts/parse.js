var domutil = require('../tools/domutil');
var debug = require('debug')('liftie:lifts');

module.exports = getParseFn;


/**
 * catch exceptions thrown by parse
 */
function getParseFn(resortId) {
  function collectParse(dom) {
    var liftStatus = domutil.collect(dom, descriptor.selector, descriptor.parse);
    debug(resortId + ' Lift Status:', liftStatus);
    return liftStatus;
  }

  var descriptor = require('../resorts/' + resortId);
  var parse = typeof descriptor === 'function' ? descriptor : collectParse;

  return function() {
    try {
      return parse.apply(null, arguments);
    } catch(e) {
      console.error('Exception when parsing ' + resortId, e);
      return {};
    }
  };
}
