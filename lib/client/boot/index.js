var init = require('domready');
var nodelist = require('nodelist');
var minimax = require('minimax');
var resort = require('resort');
var state = require('state');
var tag = require('tag');

/*global document window*/
init(function() {
  var resorts = nodelist(document.querySelectorAll('.resort')),
    opens = state(resorts, 'open'),
    starred = state(resorts, 'starred'),
    starredTag = tag(document.querySelector('.tags .starred'));
  resorts.forEach(function(r) {
    minimax(r, '.minimax').state('open').on(function(open) {
      if (open) {
        resort(r).refresh();
      }
      opens.update();
    });
    minimax(r, '.star').state('starred').on(function() {
      starredTag.update(starred.update().length);
    });
  });
  window.setInterval(function() {
    resorts.forEach(function(r) {
      resort(r).refresh();
    });
  }, 65 * 1000);
  opens.update();
  starredTag.update(starred.load().length);
});