var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mt-spokane');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.feedListColumn:first-child .feedListItem');

  debug('Mt Spokane Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
