var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:jackson-hole');


function parse(dom) {
  var liftStatus = {};

  function parseLift(li) {
    var name = li.children[0].data,
      status = li.attribs.class;
    liftStatus[name] = coerce(status);
  }

  select(dom, 'h2').forEach(function(node) {
    if (node.children[0].data !== 'Lift Status') {
      return;
    }
    select(node.next, 'li').forEach(parseLift);
  });

  debug('Jackson Hole Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
