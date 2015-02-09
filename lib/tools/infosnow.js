var domutil = require('./domutil');
var select = require('../select');
var entities = require('./entities');
var debug = require('debug')('liftie:resort:infosnow');

function parse(dom) {
  var nodes = select(dom, '.block table tr'), liftStatus;

  nodes.some(function (node) {

    if (domutil.childText(node, 0).split(' ').shift() !== 'Lifts') {
      return;
    }
    liftStatus = domutil.collect(node.parent.parent.parent, '.content table tr .icon[src*="status"]', function (node) {
      return {
        name: entities(node.parent.next.next.children[0].data),
        status: node.attribs.src.split('/').pop().slice(0,-4)
      };
    });
    return true;
  });


  debug('Infosnow APGSGA Lift Status:', liftStatus);
  return liftStatus;
}


module.exports = parse;
