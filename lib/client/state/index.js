const cookie = require('js-cookie');

/*global window*/

const k = require('k')(window);

module.exports = state;

function state(nodes, st, keys) {
  const cookieName = `resorts-${st}`;

  const self = {
    load,
    save,
    update,
    read
  };

  function find(id) {
    return nodes.find(n => n.dataset.resort === id);
  }

  function read() {
    const text = cookie.get(cookieName);
    return text?.length ? text.split(',') : [];
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
    const state = read().reduce((memo, id) => {
      memo[id] = true;
      return memo;
    }, {});

    nodes.forEach(({ dataset, classList }) => {
      const id = dataset.resort;
      state[id] = classList.contains(st);
    });

    const selected = Object.keys(state)
      .filter(id => state[id]);

    write(selected);
    return selected;
  }


  function save() {
    const selected = nodes
      .filter(n => n.classList.contains(st))
      .map(n => n.dataset.resort);

    write(selected);
    return selected;
  }

  function load() {
    const selected = read();
    selected.forEach(id => {
      const node = find(id);
      if (node) {
        node.classList.add(st);
      }
    });
    return selected;
  }

  function all(on) {
    nodes.forEach(n => n.classList.toggle(st, on));
    update();
  }

  if (keys) {
    k(keys.on, all.bind(null, true));
    k(keys.off, all.bind(null, false));
  }

  return self;
}
