var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:boreal');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.report:nth-of-type(2) tbody tr', {
    name: 1,
    status: 2
  });

  debug('Boreal Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
