var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mount-sunapee');

//*[@id="form1"]/div[2]/div/div[8]
function parse(dom) {
  var liftStatus = domutil.collect(dom, '#collapseLifts .lifts_item', function(node) {
    return {
      name: domutil.findText(node),
      status: node.attribs.class.split(' ').pop()
    };
  });

  debug('Mount Sunapee Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
