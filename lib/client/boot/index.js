var init = require('domready');
var nodelist = require('nodelist');
var minimax = require('minimax');
var resort = require('resort');
var state = require('state');
var tag = require('tag');

/*global document window*/
init(function() {
  var rnodes = nodelist(document.querySelectorAll('.resort')),
    opens = state(rnodes, 'open'),
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
  });
  window.setInterval(function() {
    resorts.forEach(function(r) {
      r.refresh();
    });
  }, 5 * 1000);
  opens.update();
  starredTag.update(starred.load().length);
});