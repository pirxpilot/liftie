var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:alyeska');

function parse(dom) {
  var nodes = select(dom, '.mountain-status-label b'), liftStatus;
  nodes.some(function (node) {
    if (node.children[0].data === 'Lifts Status') {
      liftStatus = domutil.collect(node.parent.next, 'tr.cells', function (node) {
        var name, status;
        name = node.children[0].children[0].data;
        status = node.children[2].children[0].data;
        if (status === 'Closed') {
          status = node.children[3].children[0].data;
        }
        return {
          name: name,
          status: status 
        };
      });

      return true;
    }
  });

  debug('Alyeska Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
