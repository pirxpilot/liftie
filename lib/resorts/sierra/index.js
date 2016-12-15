var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sierra');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts-list.active tbody tr', {
    name: 1,
    status: 2
  });

  debug('Sierra at Tahoe Lift Status:', liftStatus);

  return liftStatus;
}

module.exports = parse;
