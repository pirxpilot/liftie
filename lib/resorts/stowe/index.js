var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:stowe');

function parse(dom) {
  var liftStatus = {};


  function parseLift(li) {
    var status1, status2, name;
    name = li.children[li.children.length - 2].children[0].data;
    // lifts have 2 statuses
    status1 = li.children[0].attribs.src;
    status2 = (li.children[1].attribs && li.children[1].attribs.src) || status1;

    status1 = coerce(status1, status1.lastIndexOf('/') + 1, -4);
    status2 = coerce(status2, status2.lastIndexOf('/') + 1, -4);
    // for closed lifts status1 matters (either 'closed' or 'scheduled')
    if (status2 === 'closed') {
      status2 = status1;
    }
    liftStatus[name] = coerce(status2);
  }

  select(dom, '.trailgroup .trails h2').forEach(function(h2) {
    if (h2.children[0].data.indexOf('Lifts') > -1) {
      select(h2.next, 'li').forEach(parseLift);
    }
  });

  debug('Stowe Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
