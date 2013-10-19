var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:telluride');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'lifts lift').forEach(function(node) {
    var name = node.attribs.heading,
      status = node.attribs.status;
    liftStatus[name] = coerce(status);
  });

  debug('Telluride Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
