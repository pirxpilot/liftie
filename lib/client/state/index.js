var cookie = require('cookie');
var classes = require('classes');
var dataset = require('dataset');

/*global window*/

var k = require('k')(window);

module.exports=state;

function state(nodes, st, keys) {
  var MILLIS_IN_MONTH = 30 * 24 * 60 * 60 * 1000,
    cookieName = 'resorts-' + st,
    self = {
      load: load,
      save: save,
      update: update,
      read: read
    };

  function find(id) {
    var found;
    nodes.some(function(node) {
      if (dataset(node, 'resort') === id) {
        found = node;
        return true;
      }
    });
    return found;
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

    nodes.forEach(function(node) {
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

  function all(on) {
    var fn = on ? 'add' : 'remove';
    nodes.forEach(function(node) {
      classes(node)[fn](st);
    });
    update();
  }

  if (keys) {
    k(keys.on, all.bind(null, true));
    k(keys.off, all.bind(null, false));
  }

  return self;
}
