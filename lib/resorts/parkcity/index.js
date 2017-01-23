var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:parkcity');

var status = ['closed', 'open', 'hold'];

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.liftContainer', function(node) {

    var index = domutil.child(node, '1/0').attribs.src.split('_').pop();
    index = parseInt(index, 10);
    return {
      name: domutil.childText(node, 0),
      status: status[index]
    };
  });

  debug('Park City Lift Status:', liftStatus);

  return liftStatus;
}

module.exports = parse;
