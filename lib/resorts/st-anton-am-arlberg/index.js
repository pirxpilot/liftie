var select = require('../../select');

function parse(dom) {
  var liftStatus = { };

  // Only pick the first intermaps-list element
  var parentDiv = select(dom, 'div.intermaps-list')[0];
  select(parentDiv, 'div > div').forEach(function(node) {
    // THe span that contains the lift name
    var span = select(node, 'span')[0];
    if(span) {
      var liftName = span.children[0].data;
      var img = select(span.parent, 'div > img')[0];
      if(img) {
        var status = img.attribs.alt;
        if(status) {
          liftStatus[liftName] = status;
        }
      }
    }
  });

  return liftStatus;
}

module.exports = parse;
