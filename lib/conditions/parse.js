const domutil = require('../tools/conditions-domutil');
const debug = require('debug')('liftie:conditions');

module.exports = getParseFn;


/**
 * catch exceptions thrown by parse
 */
function getParseFn(resortId) {

  const descriptor = require(`../resorts/${resortId}`);
  const parse = typeof descriptor === 'function' ? descriptor : collectParse;

  wrappedParse.isAsync = parse.length > 1;

  return wrappedParse;

  function wrappedParse (...args) {
    try {
      return parse(...args);
    } catch(e) {
      console.error(`Exception when parsing conditions ${resortId}`, e);
      return {};
    }
  }

  function collectParse(dom) {
    const conditions = domutil.collect(dom, descriptor.conditions);
    debug(`${resortId} Conditions:`, conditions);
    return conditions;
  }
}
