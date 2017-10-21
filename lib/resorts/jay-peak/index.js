var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:jay-peak');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.node-type-lifts-trails:nth-child(n+1):nth-child(-n+10) ', {
    name: '0/0',
    status: '1/0'
  });

  debug('Jay Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
