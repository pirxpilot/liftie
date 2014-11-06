var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:boreal');


function detectLift(name) {
  var suffix = ' Chairlift',
    len = suffix.length;

  if (name.slice(-len) == suffix) {
    return name.slice(0, -len);
  }
}

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.condensed-table tr:nth-child(n + 4)', function(node) {
    var name = detectLift(domutil.childText(node, '0/1').trim());
    if (!name) {
      return;
    }

    return {
      name: name,
      status: domutil.child(node, '1/0').attribs.class.split('-').pop()
    };
  });

  debug('Boreal Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
