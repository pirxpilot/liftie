var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:sugarloaf');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift-status .lift').forEach(function(node) {
    var name = node.children[0].data,
      status = node.attribs['class'].split(' ').pop();
      liftStatus[name] = coerce(status);
  });

  debug('SugarLoaf Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
