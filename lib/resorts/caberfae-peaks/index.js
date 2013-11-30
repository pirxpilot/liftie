var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:caberfae-peaks');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#tablepress-4 td span', function(node) {
    return {
      name: domutil.findText(node.parent.next).split(' ').slice(0, -1).join(' '),
      status: domutil.findText(node)
    };
  });

  debug('Caberfae Peaks Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
