var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:cransmontana');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'item').forEach(function(node) {
    var name = node.attribs.nom,
      status = node.attribs.stat;
    // change to title case
    name = name.replace(/\w\S*/g, function(word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
    });
    liftStatus[name] = coerce(status);
  });

  debug('Crans-Montana Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
