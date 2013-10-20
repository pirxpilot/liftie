var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:grouse');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#lifts tr').forEach(function(node, index) {
    if (index === 0) {
      return;
    }
    var name = node.children[0].children[0].data.trim(),
      status = node.children[1].children[0].attribs.class;
    if (name.slice(-6) === ' Chair') {
      name = name.slice(0, -6);
    }
    liftStatus[name] = coerce(status);
  });

  debug('Grouse Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
