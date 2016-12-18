var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:solitude');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts tbody tr', function(node) {
    return {
      name: domutil.childText(node, '0/0'),
      status: domutil.child(node, '1/0').attribs.class.split('-').pop()
    };
  });

  debug('Solitude Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
