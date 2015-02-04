var domutil = require('./domutil');
var select = require('../select');
var debug = require('debug')('liftie:resort:infosnow');

function parse(dom) {
  var nodes = select(dom, '.block table tr'), liftStatus;

  nodes.some(function (node) {

    var name, status;

      if (domutil.childText(node, 0).split(' ').shift() == 'Lifts') {
        liftStatus = domutil.collect(node.parent.parent.parent, '.content table tr td', function (node) {

          if(node.children[0] && node.children[0].type !== 'text' && node.children[0].attribs.src.indexOf('status') !== -1 && node.next.next && node.next.next.children[0]) {
            name = node.next.next.children[0].data;
            status = node.children[0].attribs.src.split('/').pop().slice(0,-4);
            }
            else
            return;

              return {
                name: name,
                status: status
              };

        });
        return true;
      }
  });


  debug('Infosnow APGSGA Lift Status:', liftStatus);
  return liftStatus;
}


module.exports = parse;
