var init = require('init');
var nodelist = require('nodelist');
var minimax = require('minimax');
var resort = require('resort');

/*global document window*/


init(function() {
  var resorts = nodelist(document.querySelectorAll('.resort'));
  resorts.forEach(function(r) {
    minimax(r, '.expandable', '.minimax');
  });
  window.setInterval(function() {
    resorts.forEach(function(r) {
      resort(r).refresh();
    });
  }, 65 * 1000);
});