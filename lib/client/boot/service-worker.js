module.exports = register;

/* global navigator, console */

function registrationHandler({ scope, installing, waiting, active }) {
  console.log('SW', scope);

  if (installing) {
    console.log('installing', installing.state);
  }
  if (waiting) {
    console.log('waiting', waiting.state);
  }
  if (active) {
    console.log('active', active.state);
  }
}

function register(url = '/sw.js') {
  if (navigator.serviceWorker && document.documentElement.hasAttribute('data-service-worker')) {
    return navigator.serviceWorker
      .register(url)
      .then(registrationHandler)
      .catch(reason => console.log('SW registration failed!', reason));
  }
}
