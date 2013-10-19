var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:solitude');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'h2')
    .filter(function(node) {
      return 'Lift Report' === node.children[0].data;
    })
    .forEach(function(node) {
      select(node.next.next, 'td.copy p').forEach(function(node){
        var name = node.children[0].data,
          status = node.attribs.class;
        liftStatus[name] = coerce(status, 'status'.length);
    });
  });

  debug('Solitude Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
