var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:soelden');



//*[@id="middleContent"]/div[2]/div[4]/table


function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(select(dom, '.infoTable')[1], 'tr').forEach(function(node, index) {
    if (index < 2 || node.children.length < 7) {
      return; // skip header and footer
    }
    var name = node.children[1].children[0].data,
      status = node.children[6].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Sölden Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
