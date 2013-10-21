var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:big-sky');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '.lifts table tr').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.children[1].attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Big Sky Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
