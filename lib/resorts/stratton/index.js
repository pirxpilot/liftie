var select = require('../../select');
var debug = require('debug')('liftie:resort:stratton');
var coerce = require('../../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#statusTablesLift img').forEach(function(img) {
    var name = img.parent.children[1].data,
      status = img.parent.next.next.children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Lift Status', liftStatus);
  return liftStatus;
}

module.exports = parse;
