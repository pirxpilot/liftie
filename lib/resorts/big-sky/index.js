var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:big-sky');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts tbody tr');

  debug('Big Sky Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
