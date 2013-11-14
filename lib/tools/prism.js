var domutil = require('./domutil');
var debug = require('debug')('liftie:resort');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift_list_table tbody tr', {
    name: '0/0',
    status: '2/0'
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
