var domutil = require('../../tools/domutil');
var entities = require('../../tools/entities');
var debug = require('debug')('liftie:resort:brianhead');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#right_col tr:nth-child(n + 1)', function(node) {
    var name, match;

    name = domutil.childText(node, 0);
    if (!name) {
      return;
    }
    match = entities(name).match(/#\d+\s+(.*\b)/); // all lifts have #NN prefix
    if (!match) {
      return;
    }
    return {
      name: match[1],
      status: domutil.childText(node, '1')
    };
  });

  debug('Brian Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
