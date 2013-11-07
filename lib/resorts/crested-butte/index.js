var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:crested-butte');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'table.category.large tr');

  debug('Crested Butte Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
