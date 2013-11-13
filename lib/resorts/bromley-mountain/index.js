var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:bromley-mountain');

function parse(dom) {
  var liftStatus, liftTable;

  liftTable = select(dom, '.trailblock table').pop();

  liftStatus = domutil.collect(liftTable, 'td', function(node) {
    return {
      name: domutil.childText(node, 0).trim(),
      status: domutil.child(node, '1/0').attribs.alt.split(' ')[0]
    };
  });

  debug('Bromley Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
