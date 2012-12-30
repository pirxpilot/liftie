var events = require('event');
var classes = require('classes');
var nodelist = require('nodelist');

module.exports=minimax;

/**
 * @param {Array} elements list of affected element
 * @param {Element} trigger button|link that flips min, max state
 */
function minimax(node, affectedSelector, triggerSelector) {
  var trigger = node.querySelector(triggerSelector);

  function action() {
    var elems = node.querySelectorAll(affectedSelector);
    nodelist(elems).forEach(function(el) {
      classes(el).toggle('hidden');
    });
  }

	function onclick(e) {
    var state = classes(node).toggle('open').has('open');
		e.preventDefault();
    console.log('New state is:', state);
    action(state);
	}

	events.bind(trigger, 'click', onclick);
}