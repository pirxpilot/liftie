var cookie = require('cookie');
var classes = require('classes');
var dataset = require('dataset');

module.exports=state;

function state(nodes, st) {
  var MILLIS_IN_MONTH = 30 * 24 * 60 * 60 * 1000,
    cookieName = 'resorts-' + st,
    self = {
      load: load,
      save: save,
      update: update,
      read: read
    };

  function find(id) {
    return nodes.find(function(node) {
      return dataset(node, 'resort') === id;
    });
  }

  function read() {
    var text = cookie(cookieName);
    return text && text.length ?  text.split(',') : [];
  }

  function write(arr) {
    cookie(cookieName, arr.join(','), {
      maxage: MILLIS_IN_MONTH,
      path: '/'
    });
  }

  function update() {
    var state = read().reduce(function(memo, id) {
      memo[id] = true;
      return memo;
    }, {}), selected;

    nodes.each(function(node) {
      var id = dataset(node, 'resort');
      state[id] = classes(node).has(st);
    });

    selected = Object.keys(state)
      .filter(function(id) {
        return state[id];
      });

    write(selected);
    return selected;
  }


  function save() {
    var selected = nodes
      .filter(function(node) {
        return classes(node).has(st);
      })
      .map(function(node) {
        return dataset(node, 'resort');
      });

    write(selected);
    return selected;
  }

  function load() {
    var selected = read();
    selected.forEach(function(id) {
      var node = find(id);
      if (node) {
        classes(node).add(st);
      }
    });
    return selected;
  }

  return self;
}
