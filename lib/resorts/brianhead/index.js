var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:brianhead');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.table-striped tbody tr').forEach(function(node) {
    var name = node.children[1].children[0].data.trim(),
      status = node.children[2].children[0].attribs.alt;
    name = name.slice(name.indexOf(' ') + 1);  // strip #1 prefix
    liftStatus[name] = coerce(status);
  });

  debug('Brian Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
