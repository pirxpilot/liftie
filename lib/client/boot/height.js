var debounce = require('debounce');
var events = require('event');

module.exports = postHeight;

/*global window, document*/

function notify() {
  var widget = document.querySelector('.widget');
  if (!widget) {
    return;
  }
  window.parent.postMessage({
    height: widget.scrollHeight,
    resort: window.location.pathname.split('/').pop()
  }, '*');
}

function postHeight() {
  if (window === window.parent) {
    // we are not embedded - nothing to do
    return;
  }
  notify();
  events.bind(window, 'resize', debounce(notify, 300), true);
}