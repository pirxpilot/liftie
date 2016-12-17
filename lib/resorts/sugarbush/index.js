var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sugarbush');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.snow-report-tab-lifts tbody tr', function(node) {
    return {
      name: domutil.childText(node, '1/0'),
      status: domutil.child(node, '2/0').attribs['class'].split('-').pop()
    };
  });

  debug('Sugarbush Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
