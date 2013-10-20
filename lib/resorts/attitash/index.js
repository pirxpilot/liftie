var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:attitash');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'h5').forEach(function(node) {
    var name, status, nas;
    if (node.children.length > 1) {
      name = node.children[0].data.slice(0, -3),
      status = node.children[1].children[0].data;
    }
    else {
      nas = node.children[0].data.split('-');
      name = nas[0].trim();
      status = nas[1].trim();
    }
    liftStatus[name] = coerce(status);
  });

  debug('Attitash Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
