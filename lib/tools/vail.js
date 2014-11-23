var domutil = require('./domutil');
var decode = require('./entities');
var debug = require('debug')('liftie:resort:vail');

module.exports = parse;

function getStatus(tr) {
  var node = domutil.child(tr, '2/0');
  if (node && node.attribs && node.attribs.alt) {
    return node.attribs.alt;
  }
  node = domutil.child(tr, 2);
  if (node && node.attribs && node.attribs.class) {
    return node.attribs.class.slice(0, -6);
  }
}


// common parser for Vail Resorts lift status
function parse(dom) {
  var liftStatus = domutil.collect(dom, '#Lifts tr', function(tr, index) {
    var name, status;

    if (index === 0) {
      return; // skip header
    }

    status = getStatus(tr);
    if (!status) {
      return;
    }
    name = decode(domutil.childText(tr, '0/0')).trim();
    if (/ Express Lift$/.test(name)) {
      name = name.slice(0, - ' Express Lift'.length);
    }

    return {
      name: name,
      status: status
    };
  });

  debug('vail Lift Status:', liftStatus);
  return liftStatus;
}