var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:smuggs');

// sending HTML as a part of XML CDATA - wrong on so many levels...
function parse(dom) {
  var regex = /<span class="title">(.+?)(?: Lift)?<\/span><span class="(\S+)">/;

  var liftStatus = domutil.collect(dom, 'lift description', function(node) {
    var match = regex.exec(node.children[0].data);
    if (match) {
      return {
        name: match[1],
        status: match[2]
      };
    }
  });

  debug('Smugglers\' Notch Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
