var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:abasin');

function parse(dom) {
  var liftStatus = {
      'Black Mountain Express': coerce('closed'),
      'Lenawee Mountain': coerce('closed'),
      'Pika Place Carpet': coerce('closed'),
      'Pallavicini': coerce('closed'),
      'Zuma': coerce('closed'),
      'Molly Hogan': coerce('closed'),
      'Norway': coerce('closed')
  };

  select(dom, '#mountain-conditions h2').some(function (node) {
    if (node.children[0].data === 'Lifts Open') {
      node = node.next;
      if (node.name == 'ul') {
        select(node, 'li').forEach(function (node) {
          liftStatus[node.children[0].data] = coerce('open');
        });
      }
      return true;
    }
  });

  debug('Arapahoe Basin Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
