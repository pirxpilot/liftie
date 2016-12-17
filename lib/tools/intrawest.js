// common parser for Intrawest http://www.intrawest.com/about-us/who-we-are.aspx

var domutil = require('./domutil');
var debug = require('debug')('liftie:resort:intrawest');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts .lift .item-info');

  debug('Intrawest Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
