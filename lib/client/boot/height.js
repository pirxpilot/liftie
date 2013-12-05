module.exports = postHeight;

/*global window, document*/

function postHeight() {
  if (window === window.parent) {
    // we are not embedded - nothing to do
    return;
  }
  window.parent.postMessage({
    height: document.body.scrollHeight,
    resort: window.location.pathname.split('/').pop()
  }, '*');
}