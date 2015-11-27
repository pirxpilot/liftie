var domutil = require('./domutil');
var select = require('../select');
var debug = require('debug')('liftie:resort:peakresorts');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.list-lifts > li', function(node) {
    var
      name = domutil.childText(node, '1/0/0'),
      status = select(node, '.statuses .status i')[0];
    if (!name || !status) {
      return;
    }
    status = status.attribs['class'];
    if (status.indexOf('status') < 0) {
      return;
    }
    return {
      name: name,
      status: status.split('-').pop()
    };
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
