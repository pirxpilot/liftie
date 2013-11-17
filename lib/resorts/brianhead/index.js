var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:brianhead');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.table-striped tbody tr', function(node) {
    var name = domutil.childText(node, '1/0'),
      match = name.match(/\s*#\d+\s+(.*)\s*/); // all lifts have #NN prefix
    if (!match) {
      return;
    }
    return {
      name: match[1],
      status: domutil.child(node, '2/0').attribs.alt
    };
  });

  debug('Brian Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
