var select = require('../select');
var coerce = require('./coerce');
var decodeHTML = require('entities').decodeHTML;


function findText(node) {
  while(node && node.type !== 'text') {
    node = node.children && node.children[0];
  }
  if (node) {
    return node.data;
  }
}

function child(node, path) {
  if (typeof path === 'string') {
    path = path.split('/').map(function(item) {
      return parseInt(item, 10);
    });
  } else if (typeof path === 'number') {
    path = [path];
  }
  return path.reduce(function(node, index) {
    return node && node.children && node.children[index];
  }, node);
}

function childText(node, path) {
  return findText(child(node, path));
}

// parseFn can be either a function that calculates { name, status } pair
// or an object with paths to name and status
function collect(dom, selector, parse) {
  var parseFn, ls = {};

  if (!parse) {
    parse = {
      name: 0,
      status: 1
    };
  }
  parseFn = (typeof parse === 'function') ? parse : function(node) {
    return {
      name: childText(node, parse.name),
      status: childText(node, parse.status)
    };
  };

  select(dom, selector).forEach(function(node, index) {
    var r = parseFn(node, index);
    if (!r) {
      return;
    }
    if (!r.name) {
      return;
    }
    var name = decodeHTML(r.name.trim());
    var status = coerce(r.status);
    ls[name] = status;
  });

  return ls;
}

module.exports = {
  child: child,
  childText: childText,
  collect: collect,
  findText: findText
};
