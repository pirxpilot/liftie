var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sugarbowl');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.c_light table img', function(node) {
    return {
      name: domutil.findText(node.parent.prev),
      status: node.attribs.alt
    };
  });

  debug('Sugar Bowl Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
