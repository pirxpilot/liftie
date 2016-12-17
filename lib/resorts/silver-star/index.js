var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:silver-star');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.view-lift-status tbody tr', {
    name: 1,
    status: 2
  });

  debug('Silver Star Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
