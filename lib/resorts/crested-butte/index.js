var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:crested-butte');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-lift', {
  	name: '0/0/0',
	status: '3/0/0/0'
  });

  debug('Crested Butte Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
