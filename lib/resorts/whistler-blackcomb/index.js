var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:whistler-blackcomb');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'lift').forEach(function(node) {
    var name = node.attribs.name,
      status = node.attribs.status;
    // change to title case
    name = name.replace(/\w\S*/g, function(word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
    });
    liftStatus[name] = coerce(status);
  });

  debug('Whistler Blackcomb Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
