var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:red-lodge-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts_table .lift_header', {
    name: 1,
    status: 2
  });

  debug('Red Lodge Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
