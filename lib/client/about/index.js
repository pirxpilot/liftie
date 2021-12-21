const cookie = require('js-cookie');

/*global document, window*/

module.exports = about;

function about() {
  const s = document.querySelector('.hidden .about');
  if (!s) {
    // no hidden 'about' section - nothing to do
    return;
  }
  if (!check()) {
    // we already have a cookie
    return;
  }
  const section = s.parentNode;
  const trigger = s.querySelector('a.close');
  trigger.addEventListener('click', e => {
    close();
    e.preventDefault();
  });
  open();

  function check() {
    return window.parent === window && typeof cookie.get('resorts-open') === 'undefined';
  }

  function close() {
    section.classList.add('hidden');
  }

  function open() {
    section.classList.remove('hidden');
  }
}
