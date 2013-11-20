var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sun-peaks');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#main-content table tr:not(:first-child)');

  debug('Sun Peaks Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
