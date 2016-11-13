var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:red-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'img[alt="chairlift icon"]', function(img) {
    return {
      name: domutil.childText(img.parent, '1'),
      status: domutil.child(img.parent.parent, '2').attribs.class.slice(5)
    };
  });

  debug('Red Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
