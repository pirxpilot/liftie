var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:mount-sunapee');

//*[@id="form1"]/div[2]/div/div[8]
function parse(dom) {
  var liftStatus, container;

  container = select(dom, '.toggle_container')[1];
  liftStatus = domutil.collect(container, '.lines3_item', function(node) {
    var m, status = domutil.child(node, '1/0').attribs.src;
    m = status.match(/_(\S*)\.png$/);
    if (m) {
      return {
        name: domutil.childText(node, 0),
        status: m[1]
      };
    }
  });

  debug('Mount Sunapee Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
