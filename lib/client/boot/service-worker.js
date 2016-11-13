module.exports = register;

/* global navigator, console */

function registrationHandler(registration) {
  console.log('SW', registration.scope);

  if (registration.installing) {
    console.log('installing', registration.installing.state);
  }
  if (registration.waiting) {
    console.log('waiting', registration.waiting.state);
  }
  if (registration.active) {
    console.log('active', registration.active.state);
  }
}

function register(url) {
  url = url || '/sw.js';

  if (navigator.serviceWorker && document.documentElement.hasAttribute('data-service-worker')) {
    return navigator.serviceWorker.register(url)
      .then(registrationHandler)
      .catch(function(reason) {
        console.log('SW registration failed!', reason);
      });
  }
}
