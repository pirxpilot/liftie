var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:owlshead');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift_name').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.next.children[0].attribs.src;
    name = name.slice(name.indexOf('- ') + 2);
    liftStatus[name] = coerce(status, 'lift_', '.png');
  });

  debug('Owl\'s Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
