var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mthigh');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.StatusReport--lifts tbody tr', {
    name: '1/0',
    status: '2/0'
  });

  debug('Mountain High Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
