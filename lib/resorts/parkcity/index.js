var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:parkcity');


/*
Lifts status looks like this:
<tr>
  <th class="name">
    <span class="lift-name">3 Kings</span>
    <span class="lift-label">Lift</span>
  </th>
  <th class="capacity">
    <span class="icon lift-triple-icon"></span>
  </th>
  <th class="status">
    <span class="icon lift-status-open-icon"></span>
  </th>
  <th class="hours">
    <span class="lift-hours">9:00 am - 9:00 pm</span>
  </th>
</tr>
*/
function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#snow-conditions .lift-name').forEach(function(node) {
    var name, status, statusNode;
    statusNode = node.parent.next && node.parent.next.next;
    if (!statusNode) {
      return;
    }
    name = node.children[0].data;
    status = statusNode.children[0].attribs.class.split(' ')[1];
    liftStatus[name] = coerce(status, 'lift-status-'.length, - '-icon'.length);
  });

  debug('Park City Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
