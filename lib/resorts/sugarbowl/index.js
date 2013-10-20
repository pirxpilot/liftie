var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:sugarbowl');


function findText(node) {
  while(node && node.type !== 'text') {
    node = node.children && node.children[0];
  }
  if (node) {
    return node.data;
  }
}

function parse(dom) {
  var liftStatus = {};

  select(dom, '.c_light table img').forEach(function(node) {
    var name = findText(node.parent.prev),
      status = node.attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Sugar Bowl Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
