var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:snow-valley');

function parse(dom) {
  console.log('Parsing....');

  var liftStatus = domutil.collect(dom, '.liftStatus tr', function(node) {
    var name = domutil.allText(domutil.child(node, 0));

    return {
      name: name.split('-')[0],
      status: domutil.childText(node, 1)
    };
  });

  debug('Snow Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
