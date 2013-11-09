var collect = require('./domutil').collect;
var entities = require('./entities');
var debug = require('debug')('liftie:resort');

function parse(dom) {
  var liftStatus = collect(dom, 'lifts lift', function(node) {
    var name = entities(node.attribs.heading);
    return {
      name: name,
      status: node.attribs.status
    };
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
