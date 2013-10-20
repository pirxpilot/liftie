var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:moonlightbasin');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#lift-report').forEach(function(node) {
    node.children.forEach(function(child, index) {
      var name, status;
      if(child.name !== 'strong') {
        return;
      }
      status = node.children[index + 1];
      if (!status) {
        return;
      }
      name = child.children[0].data.slice(0, -1);
      status = status.data;
      liftStatus[name] = coerce(status);
    });
  });

  debug('Moonlight Basin Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
