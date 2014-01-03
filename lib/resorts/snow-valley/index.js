var select = require('../../select');
var coerce = require('../../tools/coerce');
var findText = require('../../tools/domutil').findText;
var debug = require('debug')('liftie:resort:snow-valley');

function parse(dom) {
  var liftStatus = {},
    liftsTable = select(dom, '#lstwocolumn')[0],
    name;

  // add parsing code here
  select(liftsTable, 'div').forEach(function(node, index) {
    if (index % 2) {
      liftStatus[name] = coerce(findText(node));
    } else {
      node.children.forEach(function(child) {
        if (child.type == 'text') {
          name = child.data;
        }
      });
      if (name) {
        name = name.split('-')[0].trim();
      }
    }
  });

  debug('Snow Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
