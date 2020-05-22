var cookie = require('js-cookie');

/*global document, window*/

module.exports = about;

function about() {
  var section, trigger;

  function check() {
    return window.parent === window && typeof cookie.get('resorts-open') === 'undefined';
  }

  function close() {
    section.classList.add('hidden');
  }

  function open() {
    section.classList.remove('hidden');
  }

  section = document.querySelector('.hidden .about');
  if (!section) {
    // no hidden 'about' section - nothing to do
    return;
  }
  if (!check()) {
    // we already have a cookie
    return;
  }

  trigger = section.querySelector('a.close');
  section = section.parentNode;

  trigger.addEventListener('click', function(e) {
    close();
    e.preventDefault();
  });
  open();
}
