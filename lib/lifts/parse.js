const domutil = require('../tools/domutil');
const debug = require('debug')('liftie:lifts');

module.exports = getParseFn;


/**
 * catch exceptions thrown by parse
 */
function getParseFn(resortId) {

  const descriptor = require(`../resorts/${resortId}`);
  const parse = typeof descriptor === 'function' ? descriptor : collectParse;

  wrappedParse.isAsync = parse.length > 1;

  return wrappedParse;

  function wrappedParse(...args) {
    try {
      return parse(...args);
    } catch (e) {
      console.error(`Exception when parsing ${resortId}`, e);
      return {};
    }
  }

  function collectParse(dom) {
    const liftStatus = domutil.collect(dom, descriptor.selector, descriptor.parse);
    debug(`${resortId} Lift Status:`, liftStatus);
    return liftStatus;
  }
}
