var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:grand-targhee');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#liftStatus p').forEach(function(node) {
    var name = node.children[0].data,
      status = node.attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Grand Targhee Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
