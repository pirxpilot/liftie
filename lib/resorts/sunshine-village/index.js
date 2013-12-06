var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sunshine-village');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifttable td', function(node) {
    return {
      name: domutil.findText(node.children[0]).trim().slice(0, -1),
      status: domutil.findText(node.children[1])
    };
  });

  debug('Sunshine Village Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
