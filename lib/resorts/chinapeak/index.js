var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:chinapeak');


function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  });
}

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, 'table[id$="Chairs"] span[id$="ChairName"]').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.children[0].data;
    name = toTitleCase(name);
    liftStatus[name] = coerce(status);
  });

  debug('China Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
