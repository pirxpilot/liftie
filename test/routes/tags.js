var test = require('tape');
var tags = require('../../lib/routes/tags');

test('tags should classify object according to tags', function(t) {
  var objs = {
    'a': 't3,t2,t1',
    'b': 't2',
    'c': 't1,t2',
    'd': ''
  };

  function load(name){
    return {
      id: name,
      tags: objs[name].split(',')
    };
  }

  Object.keys(objs).forEach(function (n) {
    objs[n] = load(n);
  });
  var tt = tags(objs);

  t.deepEqual(tt.t1.members, ['a', 'c']);
  t.deepEqual(tt.t2.members, ['a', 'b', 'c']);
  t.deepEqual(tt.t3.members, ['a']);
  t.deepEqual(Object.keys(tt), ['t1', 't2', 't3']);

  t.end();
});

test('tags should conver names to cannonical form', function(t) {
  var objs = {
    'a': 'Nice Tag,Another Tag',
    'b': 'Another Tag'
  };

  function load(name){
    return {
      id: name,
      tags: objs[name].split(',')
    };
  }

  Object.keys(objs).forEach(function (n) {
    objs[n] = load(n);
  });
  var tt = tags(objs);

  t.deepEqual(tt['nice-tag'].members, ['a']);
  t.deepEqual(tt['nice-tag'].label, 'Nice Tag');
  t.deepEqual(tt['another-tag'].members, ['a', 'b']);
  t.deepEqual(tt['another-tag'].label, 'Another Tag');
  t.deepEqual(Object.keys(tt), ['another-tag', 'nice-tag']);

  t.end();
});
