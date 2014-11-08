var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:brighton');


function img2status(img) {
  var m = /st-(\S+\S+)\.png$/.exec(img);
  return m && m[1];
}

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift', function(node) {
    return {
      name: domutil.childText(node, '0/0'),
      status: img2status(domutil.child(node, '1/0').attribs.src)
    };
  });

  debug('Brighton Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
