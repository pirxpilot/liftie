var select = require('../select');
var coerce = require('./coerce');

function findText(node) {
  while(node && node.type !== 'text') {
    node = node.children && node.children[0];
  }
  if (node) {
    return node.data;
  }
}

function allText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  if (!node.children) {
    return '';
  }
  return node.children
  .filter(function(c) {
    return c.type === 'text';
  })
  .map(function(c) {
    return c.data;
  })
  .join('');
}

function child(node, path) {
  if (typeof path === 'string') {
    path = path.split('/').map(item => item === '..' ? 'parent' : parseInt(item, 10));
  } else if (typeof path === 'number') {
    path = [path];
  }
  return path.reduce(function(node, index) {
    if (!node) {
      return;
    }
    if ('parent' === index) {
      return node.parent;
    }
    if (!node.children) {
      return;
    }
    if (index < 0) {
      index += node.children.length;
    }
    return node.children[index];
  }, node);
}

function childText(node, path) {
  return findText(child(node, path));
}


function text(node, descriptor) {
  if (typeof descriptor === 'function') {
    return descriptor(node);
  }
  if (descriptor.child === undefined && descriptor.attribute === undefined) {
    // string, number or array...
    return childText(node, descriptor);
  }
  if ('child' in descriptor) {
    node = child(node, descriptor.child);
  }
  if (!node) {
    return;
  }
  var text = descriptor.attribute ? node.attribs[descriptor.attribute] : findText(node);
  if (text && 'regex' in descriptor) {
    let m = text.match(descriptor.regex);
    if (!m) {
      return;
    }
    text = m[1];
  }
  return descriptor.fn ? descriptor.fn(text) : text;
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
    var name = text(node, parse.name);
    if (!name) {
      return;
    }
    var status = text(node, parse.status);
    return { name, status };
  };

  select(dom, selector).forEach(function(node, index) {
    var r = parseFn(node, index);
    if (!r) {
      return;
    }
    if (!r.name) {
      return;
    }
    var name = r.name.trim();
    var status = coerce(r.status);
    ls[name] = status;
  });

  return ls;
}

module.exports = {
  child,
  childText,
  collect,
  findText,
  allText,
  text
};
