var collect = require('./domutil').collect;
var debug = require('debug')('liftie:resort');

function parse(dom) {
  var liftStatus = collect(dom, 'lifts lift', function(node) {
    return {
      name: node.attribs.heading,
      status: node.attribs.status
    };
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
