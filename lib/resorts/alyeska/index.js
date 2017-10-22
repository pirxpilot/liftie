var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:alyeska');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'table:first-of-type tbody tr', {
    name: 0,
    status: 2
  });

  debug('Alyeska Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
