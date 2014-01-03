var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sunday-river');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.trail-table:first-of-type tr:nth-child(n + 2)', {
      name: 1,
      status: 2
  });

  debug('Sunday River Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
