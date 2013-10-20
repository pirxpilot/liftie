var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:sugarbush');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '.trail_border .trail_name').forEach(function(node) {
    var name, status;
    if (node.attribs.colspan !== '4') {
      return;
    }
    // 8217 is a "right quotation mark" - someone tried to be fancy?
    name = node.children[0].data.replace('&#8217;', '\'');
    status = node.next.children[0].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Sugarbush Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
