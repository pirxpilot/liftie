var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:red-lodge-mountain');

function parse(dom) {
  // should really be name: 1, status: 2 but they send <CR> as HTML entities!
  var liftStatus = domutil.collect(dom, '.lifts_table .lift_header', {
    name: 2,
    status: 4
  });

  debug('Red Lodge Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
