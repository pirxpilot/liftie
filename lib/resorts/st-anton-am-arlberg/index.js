var domutil = require('../../tools/domutil');
var select = require('../../select');

function parse(dom) {
  // Only pick the first intermaps-list element
  var parentDiv = select(dom, '.intermaps-list')[0];
  var liftStatus = domutil.collect(parentDiv, '.item .name', function(span) {
    var img = select(span.parent, '.icons img')[0];
    if(img && img.attribs.alt) {
      return {
        name: domutil.findText(span),
        status: img.attribs.alt
      };
    }
  });

  return liftStatus;
}

module.exports = parse;
