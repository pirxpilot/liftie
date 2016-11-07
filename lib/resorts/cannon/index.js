var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:cannon');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#intright table:first-of-type tr', {
    name: '0/0',
    status: 1
  });

  debug('Cannon Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
