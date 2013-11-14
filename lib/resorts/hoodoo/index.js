var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:hoodoo');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.eventCase:nth-child(2) .view4 tr', function(node) {
    var status = domutil.child(node, '1/1').attribs;
    if (!status) {
      return;
    }
    status = status.class.split('_', 2).pop();
    if (status === 'Night') {
      status = 'open';
    }
    return {
      name: domutil.childText(node, '0/1/0').slice(0, -1),
      status: status
    };
  });

  debug('Hoodoo Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
