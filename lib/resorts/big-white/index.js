var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:big-white');

function parse(dom) {

  var liftStatus = domutil.collect(dom, '.row.panel > .small-12', {
    name: 0,
    status: 3
  });

  debug('Big White Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
