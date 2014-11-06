var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:bromley-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'img.currently', function(node) {
    var name = domutil.childText(node.parent, '0').trim();
    if (name[0] !== '#') {
      return;
    }
    return {
      name: name,
      status: node.attribs.alt.split(' ')[0]
    };
  });

  debug('Bromley Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
