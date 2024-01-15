const test = require('node:test');
const assert = require('node:assert/strict');
const tags = require('../../lib/routes/tags');

test('tags should classify object according to tags', () => {
  const objs = {
    'a': 't3,t2,t1',
    'b': 't2',
    'c': 't1,t2',
    'd': ''
  };

  function load(name) {
    return {
      id: name,
      tags: objs[name].split(',')
    };
  }

  Object.keys(objs).forEach((n) => {
    objs[n] = load(n);
  });
  const tt = tags(objs);

  assert.deepEqual(tt.t1.members, ['a', 'c']);
  assert.deepEqual(tt.t2.members, ['a', 'b', 'c']);
  assert.deepEqual(tt.t3.members, ['a']);
  assert.deepEqual(Object.keys(tt), ['t1', 't2', 't3']);
});

test('tags should conver names to cannonical form', () => {
  const objs = {
    'a': 'Nice Tag,Another Tag',
    'b': 'Another Tag'
  };

  function load(name) {
    return {
      id: name,
      tags: objs[name].split(',')
    };
  }

  Object.keys(objs).forEach((n) => {
    objs[n] = load(n);
  });
  const tt = tags(objs);

  assert.deepEqual(tt['nice-tag'].members, ['a']);
  assert.deepEqual(tt['nice-tag'].label, 'Nice Tag');
  assert.deepEqual(tt['another-tag'].members, ['a', 'b']);
  assert.deepEqual(tt['another-tag'].label, 'Another Tag');
  assert.deepEqual(Object.keys(tt), ['another-tag', 'nice-tag']);
});
