module.exports = tag;

function tag(node) {
  let count;

  function update(c) {
    if (!count) {
      return;
    }
    count.innerHTML = c;
    node.classList.toggle('hidden', c <= 0);
  }

  if (node) {
    count = node.querySelector('.count');
  }

  return {
    update
  };
}
