var cookie = require('cookie');
var classes = require('classes');
var dataset = require('dataset');

module.exports=state;

function state(nodes, st) {
  var MILLIS_IN_MONTH = 30 * 24 * 60 * 60 * 1000,
    cookieName = 'resorts-' + st,
    self = {
      load: load,
      save: save
    };

  function find(id) {
    return nodes.filter(function(node) {
      return dataset(node, 'resort') === id;
    })[0];
  }

  function save() {
    var text = nodes
      .filter(function(node) {
        return classes(node).has(st);
      })
      .map(function(node) {
        return dataset(node, 'resort');
      })
      .join(',');
    cookie(cookieName, text, {
      maxage: MILLIS_IN_MONTH,
      path: '/'
    });
  }

  function load() {
    cookie(cookieName)
      .split(',')
      .forEach(function(id) {
        var node = find(id);
        if (node) {
          classes(node).add(st);
        }
      });
  }

  return self;
}
