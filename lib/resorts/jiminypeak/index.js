var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:jiminypeak');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#lift-data .list-group-item', function(node) {
    return {
      name: domutil.findText(node),
      status: domutil.child(node, 2).attribs.class.split('-').pop()
    };
  });

  debug('Jiminy Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
