var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:canyons');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#block-system-main td.views-field-title').forEach(function(node) {
    var name = node.children[0].data.trim(),
      status = node.next.children[0].attribs.class;
    liftStatus[name] = coerce(status, 0, - '-icon'.length);
  });

  debug('Canyons Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
