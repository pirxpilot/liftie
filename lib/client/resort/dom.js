function removeAllChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function next(node) {
  return node.nextElementSibling || node.nextSibling;
}

function el(tag, content, attrs) {
  var attrStr = Object.keys(attrs || {}).map(function(attr) {
    return attr +  '="' + attrs[attr] + '"';
  }).join(' ');

  return ['<',
    tag,
    attrStr ? ' ' + attrStr :  '',
    '>',
    content,
    '</',
    tag,
    '>'
  ].join('');
}

module.exports = {
  el:el,
  next: next,
  removeAllChildren: removeAllChildren
};