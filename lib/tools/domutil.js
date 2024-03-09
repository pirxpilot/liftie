const debug = require('debug')('liftie:domutil');

const select = require('../select');
const coerce = require('./coerce');

function findText(node) {
  while (node && node.type !== 'text') {
    node = node.children?.[0];
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
  return path.reduce((node, index) => {
    if (!node) {
      return;
    }
    switch (index) {
      case '..':
        return node.parent;
      case '+':
        return node.next;
      case '-':
        return node.prev;
      case '.':
        return node;
      default: {
        index = Number.parseInt(index, 10);
        if (Number.isNaN(index)) {
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
    debug('%s not found in %j', descriptor.child, node);
    return;
  }
  let text = descriptor.attribute ? node.attribs[descriptor.attribute] : findText(node);
  debug('found: %s', text);
  if (text && 'regex' in descriptor) {
    const m = text.match(descriptor.regex);
    if (!m) {
      debug('regex does not match');
      return;
    }
    text = m[1];
  }
  if (typeof descriptor.fn === 'function') {
    debug('calling function: %s', text);
    text = descriptor.fn.call(node, text);
  }
  return text;
}

// parseFn can be either a function that calculates { name, status } pair
// or an object with paths to name and status
function collect(dom, selector, parse = { name: 0, status: 1 }) {

  const parseFn = (typeof parse === 'function') ? parse : (node) => {
    if (parse.filter && !parse.filter(node)) {
      return;
    }
    const name = text(node, parse.name);
    if (!name) {
      return;
    }
    const status = text(node, parse.status);
    return { name, status };
  };

  const ls = {};

  select(dom, selector).forEach((node, index) => {
    const r = parseFn(node, index);
    if (!r) {
      return;
    }
    if (!r.name) {
      return;
    }
    const name = r.name.trim();
    const status = coerce(r.status);
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
