const { values } = require('lodash');
const select = require('../select');

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
    .filter(c => c.type === 'text')
    .map(c => c.data)
    .join('');
}

function child(node, path) {
  if (typeof path === 'string') {
    path = path.split('/');
  } else if (typeof path === 'number') {
    path = [path];
  }
  return path.reduce(function(node, index) {
    if (!node) {
      return;
    }
    switch(index) {
      case '..': return node.parent;
      case '+': return node.next;
      case '-': return node.prev;
      case '.': return node;
      default: {
        index = parseInt(index, 10);
        if (isNaN(index)) {
          return;
        }
        if (!node.children) {
          return;
        }
        if (index < 0) {
          index += node.children.length;
        }
        return node.children[index];
      }
    }
  }, node);
}

function childText(node, path) {
  return findText(child(node, path));
}

function text(node, descriptor) {
  return childText(node, '.');
  // if (typeof descriptor === 'function') {
  //   return descriptor(node);
  // }
  // if (descriptor.child === undefined && descriptor.attribute === undefined) {
  //   // string, number or array...
  //   return childText(node, descriptor);
  // }
  // if ('child' in descriptor) {
  //   node = child(node, descriptor.child);
  // }
  // if (!node) {
  //   return;
  // }
  // let text = descriptor.attribute ? node.attribs[descriptor.attribute] : findText(node);
  // if (text && 'regex' in descriptor) {
  //   let m = text.match(descriptor.regex);
  //   if (!m) {
  //     return;
  //   }
  //   text = m[1];
  // }
  // return descriptor.fn ? descriptor.fn(text) : text;
}

function collect(dom, selectors) {
  const ls = {};

  for(const selector in selectors) {
    const entity = select(dom, selectors[selector]);
    if (!entity || !entity[0]) {
      continue;
    }

    const value = text(entity[0], selectors[selector]);
    if (!value) {
      continue;
    }
    ls[selector] = value;
  }

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
