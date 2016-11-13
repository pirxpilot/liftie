var init = require('domready');
var minimax = require('minimax');
var resort = require('resort');
var state = require('state');
var tag = require('tag');
var analytics = require('ua');
var about = require('about');
var load = require('load');
var stats = require('stats');
var height = require('./height');
var serviceWorker = require('./service-worker');

/*global document */
/*global window */

function enumerable(nl) {
  var
    l = nl.length,
    arr = new Array(l);

  while(l--) { arr[l]=nl[l]; }
  return arr;
}

serviceWorker();
init(function() {
  var rnodes = enumerable(document.querySelectorAll('.resort')),
    opens = state(rnodes, 'open', {
      on: 'shift + o',
      off: 'shift + x'
    }),
    starred = state(rnodes, 'starred'),
    starredTag = tag(document.querySelector('.tags .starred')),
    resorts = rnodes.map(function(r) {
      return resort(r);
    });

  resorts.forEach(function(r) {
    minimax(r.node, '.minimax').state('open').on(function(open) {
      if (open) {
        r.refresh(true);
      }
      opens.update();
    });
    minimax(r.node, '.star').state('starred').on(function() {
      starredTag.update(starred.update().length);
    });
    r.init();
  });
  window.setInterval(function() {
    resorts.forEach(function(r) {
      r.refresh();
    });
  }, 5 * 1000);
  about();
  opens.update();
  starredTag.update(starred.load().length);
  if (document.querySelector('.twitter-follow-button')) {
    load('//platform.twitter.com/widgets.js');
  }
  stats();
  height();
  analytics();
});
