// common parser for Intrawest http://www.intrawest.com/about-us/who-we-are.aspx

var domutil = require('./domutil');
var debug = require('debug')('liftie:resort:intrawest');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#statusTablesLift tbody tr', function(tr) {
    return {
      name: domutil.childText(tr, 0) || domutil.childText(tr, '0/1'),
      status: domutil.childText(tr, 2)
    };
  });

  debug('Intrawest Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
