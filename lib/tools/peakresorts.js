var domutil = require('./domutil');
var debug = require('debug')('liftie:resort:peakresorts');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.list-lifts li', function(node) {
    return {
      name: domutil.childText(node, '1/0/0'),
      status: domutil.child(node, '0/0/0').attribs['class'].split('-').pop()
    };
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
