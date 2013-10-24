var classes = require('classes');

module.exports = tag;

function tag(node) {
  var count;

  function update(c) {
    if (!count) {
      return;
    }
    count.innerHTML = c;
    if (c > 0) {
      classes(node).remove('hidden');
    } else {
      classes(node).add('hidden');
    }
  }

  if (node) {
    count = node.querySelector('.count');
  }

  return {
    update: update
  };
}
