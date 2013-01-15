var classes = require('classes');

module.exports = tag;

function tag(node) {
  var count;

  function update(c) {
    count.innerHTML = c;
    if (c > 0) {
      classes(node).remove('hidden');
    } else {
      classes(node).add('hidden');
    }
  }

  count = node.querySelector('.count');

  return {
    update: update
  };
}
