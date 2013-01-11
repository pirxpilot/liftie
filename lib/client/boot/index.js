var init = require('domready');
var nodelist = require('nodelist');
var minimax = require('minimax');
var resort = require('resort');
var state = require('state');

/*global document window*/
init(function() {
  var resorts = nodelist(document.querySelectorAll('.resort')),
    opens = state(resorts, 'open'),
    starred = state(resorts, 'starred');
  resorts.forEach(function(r) {
    minimax(r, '.minimax').state('open').on(function(open) {
      if (open) {
        resort(r).refresh();
      }
      opens.save();
    });
    minimax(r, '.star').state('starred').on(function() {
      starred.save();
    });
  });
  window.setInterval(function() {
    resorts.forEach(function(r) {
      resort(r).refresh();
    });
  }, 65 * 1000);
  opens.save();
  starred.load();
});