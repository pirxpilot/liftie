module.exports=minimax;

/**
 * @param {Array} elements list of affected element
 * @param {Element} trigger button|link that flips min, max state
 */
function minimax(node, selector) {
  var my = {
    trigger: node.querySelector(selector),
    state: 'open', // by default trigger 'open' state
    fn: function() {}
  }, self = {
    state: state,
    on: on
  };

  function onclick(e) {
    e.preventDefault();
    var state = node.classList.toggle(my.state);
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
