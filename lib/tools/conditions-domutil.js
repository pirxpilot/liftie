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
  let text = descriptor.attribute ? node.attribs[descriptor.attribute] : findText(node);
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
function collect(dom, selector, parse = { base: 0, season: 1, twentyfour_hours: 2, fortyeight_hours: 3, seven_days: 4 }) {

const parseFn = (typeof parse === 'function') ? parse : function(condition, node) {
    if (parse.filter && !parse.filter(node)) {
        return;
    }
    console.log(parse[condition]);
    const value = text(node, parse[condition]);

    return value;
    };

  const ls = {};

  for (const condition in parse) {
        select(dom, selector).forEach(function(node, index) {
            const r = parseFn(condition, node, index);
            if (!r) {
                return;
            }
            console.log(condition + ": " + r);

            ls[condition] = r;
            return;
        });
      console.log(condition);
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
