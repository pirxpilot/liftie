var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:cannon');

function parse(dom) {
  var liftStatus = {};

  var table = select(dom, '.secondary-content table')[0];
  // add parsing code here
  select(table, 'tr').forEach(function(node) {
    var name = node.children[0].children[0].children[0].data,
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Cannon Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
