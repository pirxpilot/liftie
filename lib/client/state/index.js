var cookie = require('js-cookie');

/*global window*/

var k = require('k')(window);

module.exports=state;

function state(nodes, st, keys) {
  var
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
      if (node.dataset.resort === id) {
        found = node;
        return true;
      }
    });
    return found;
  }

  function read() {
    var text = cookie.get(cookieName);
    return text && text.length ?  text.split(',') : [];
  }

  function write(arr) {
    cookie.set(cookieName, arr.join(','), {
      expires: 30,
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'strict'
    });
  }

  function update() {
    var state = read().reduce(function(memo, id) {
      memo[id] = true;
      return memo;
    }, {}), selected;

    nodes.forEach(function(node) {
      var id = node.dataset.resort;
      state[id] = node.classList.contains(st);
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
        return node.classList.contains(st);
      })
      .map(function(node) {
        return node.dataset.resort;
      });

    write(selected);
    return selected;
  }

  function load() {
    var selected = read();
    selected.forEach(function(id) {
      var node = find(id);
      if (node) {
        node.classList.add(st);
      }
    });
    return selected;
  }

  function all(on) {
    nodes.forEach(function(node) {
      node.classList.toggle(st, on);
    });
    update();
  }

  if (keys) {
    k(keys.on, all.bind(null, true));
    k(keys.off, all.bind(null, false));
  }

  return self;
}
