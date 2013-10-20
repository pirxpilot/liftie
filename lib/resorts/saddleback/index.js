var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:saddleback');

function parse(dom) {
  var liftStatus = {};

  var table = select(dom, '.report_table')[0];
  if (!table) {
    return liftStatus;
  }
  select(table, 'strong').forEach(function(node) {
    var name = node.children[0].data,
      status = node.parent.next.attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Saddleback Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
