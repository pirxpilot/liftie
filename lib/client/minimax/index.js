var events = require('event');
var classes = require('classes');

module.exports=minimax;

/**
 * @param {Array} elements list of affected element
 * @param {Element} trigger button|link that flips min, max state
 */
function minimax(node, selector, fn) {
  var trigger = node.querySelector(selector);

  function onclick(e) {
    var state = classes(node).toggle('open').has('open');
    e.preventDefault();
    fn(state);
  }

  events.bind(trigger, 'click', onclick);
}