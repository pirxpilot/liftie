var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:tremblant');


function filterText(text, node) {
  if (node.children.length && node.children[0]) {
    return text === node.children[0].data;
  }
}

function findParent(item, type) {
  while(item && item.name !== type) {
    item = item.parent;
  }
  return item;
}

function parse(dom) {
  var liftStatus = {}, th, table;

  th = select(dom, 'th').filter(filterText.bind(null, 'Lifts'))[0];
  table = findParent(th, 'table');

  select(table, 'tbody tr').forEach(function(node) {
    if (node.children < 2) {
      return;
    }
    var name = node.children[0].children[0].data,
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Mont Tremblant Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
