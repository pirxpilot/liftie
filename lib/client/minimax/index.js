module.exports = minimax;

/**
 * @param {Array} elements list of affected element
 * @param {Element} trigger button|link that flips min, max state
 */
function minimax(node, selector) {
  const my = {
    trigger: node.querySelector(selector),
    state: 'open', // by default trigger 'open' state
    fn() {}
  };

  const self = {
    state,
    on
  };

  function onclick(e) {
    e.preventDefault();
    const state = node.classList.toggle(my.state);
    my.fn.call(null, state);
  }

  function state(s) {
    my.state = s;
    return self;
  }

  function on(fn) {
    my.fn = fn;
    return self;
  }

  if (my.trigger) {
    my.trigger.addEventListener('click', onclick);
  }

  return self;
}
