var collect = require('../../tools/domutil').collect;
var debug = require('debug')('liftie:resort:snowbird');

function parse(dom) {
  var liftStatus = collect(dom, '#lifts-list li');

  debug('Snowbird Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
