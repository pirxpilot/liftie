var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:brianhead');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.fancy-table.full-width tr:nth-child(n + 1)', function(node) {
    var name, match;

    name = domutil.childText(node, 0);
    if (!name) {
      return;
    }
    match = name.match(/\s*#\d+\s+(.*)\s*/); // all lifts have #NN prefix
    if (!match) {
      return;
    }
    return {
      name: match[1],
      status: domutil.child(node, '1/0').attribs.class.split(/[\s-]/)[1]
    };
  });

  debug('Brian Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
