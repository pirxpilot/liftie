var init = require('domready');
var nodelist = require('nodelist');
var minimax = require('minimax');
var resort = require('resort');
var state = require('state');

/*global document window*/
init(function() {
  var resorts = nodelist(document.querySelectorAll('.resort'));
  resorts.forEach(function(r) {
    minimax(r, '.minimax', function(open) {
      if (open) {
        resort(r).refresh();
      }
      state(resorts).save();
    });
  });
  window.setInterval(function() {
    resorts.forEach(function(r) {
      resort(r).refresh();
    });
  }, 65 * 1000);
  state(resorts).save();
});