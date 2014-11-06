var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:hoodoo');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.drop-case:first-of-type .view2 tr', function(node) {
    var name, status;

    status = domutil.child(node, '1/0');
    if (!status || !status.attribs) {
      return;
    }
    status = status.attribs.class.split('_', 2).pop();
    if (status === 'Night') {
      status = 'open';
    }

    name = domutil.childText(node, 0);
    if (!name) {
      return;
    }
    return {
      name: name.slice(0, -1),
      status: status
    };
  });

  debug('Hoodoo Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
