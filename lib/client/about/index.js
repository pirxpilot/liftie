var classes = require('classes');
var cookie = require('cookie');
var events = require('event');

/*global document, window*/

module.exports = about;

function about() {
  var section, trigger;

  function check() {
    return window.parent === window && typeof cookie('resorts-open') === 'undefined';
  }

  function close() {
    classes(section).add('hidden');
  }

  function open() {
    classes(section).remove('hidden');
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

  events.bind(trigger, 'click', function(e) {
    close();
    e.preventDefault();
  });
  open();
}
