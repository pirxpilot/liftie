var events = require('event');
var classes = require('classes');

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
    var state = classes(node).toggle(my.state).has(my.state);
    e.preventDefault();
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
    events.bind(my.trigger, 'click', onclick);
  }

  return self;
}