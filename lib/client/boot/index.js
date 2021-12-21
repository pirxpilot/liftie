const init = require('domready');
const minimax = require('minimax');
const resort = require('resort');
const state = require('state');
const tag = require('tag');
const about = require('about');
const stats = require('stats');
const height = require('./height');
const serviceWorker = require('./service-worker');
const twitterIntent = require('./twitter-intent');

/*global document */
/*global window */

function enumerable(nl) {
  let l = nl.length;
  const arr = new Array(l);

  while(l--) { arr[l]=nl[l]; }
  return arr;
}

serviceWorker();
init(() => {
  const rnodes = enumerable(document.querySelectorAll('.resort'));

  const opens = state(rnodes, 'open', {
    on: 'shift + o',
    off: 'shift + x'
  });

  const starred = state(rnodes, 'starred');
  const starredTag = tag(document.querySelector('.tags .starred'));

  const resorts = rnodes.map(r => resort(r));

  resorts.forEach(r => {
    minimax(r.node, '.minimax')
      .state('open')
      .on(open => {
        if (open) {
          r.refresh(true);
        }
        opens.update();
      });
    minimax(r.node, '.star')
      .state('starred')
      .on(() => starredTag.update(starred.update().length));
    r.init();
  });
  window.setInterval(() => resorts.forEach(r => r.refresh()), 5 * 1000);
  about();
  opens.update();
  starredTag.update(starred.load().length);

  const tfb = document.querySelector('.twitter-follow-button');
  if (tfb) {
    twitterIntent(tfb);
  }
  stats();
  height();
});
