var dataset = require('dataset');

module.exports = analytics;

/*global document, window */

function loadScript(scriptUrl, async) {
  var js, fjs;

  js = document.createElement('script');
  js.src = scriptUrl;
  if (async) {
    js.async = true;
  }
  fjs = document.getElementsByTagName('script')[0];
  fjs.parentNode.insertBefore(js, fjs);
}

function analytics() {
  var propertyId = dataset(document.body, 'gaPropertyId');
  var gaq;

  if (!propertyId) {
    return;
  }

  gaq = window._qaq = window._qaq || [];
  gaq.push(['_setAccount', propertyId]);
  gaq.push(['_trackPageview']);

  loadScript('http://www.google-analytics.com/ga.js', true);
}
