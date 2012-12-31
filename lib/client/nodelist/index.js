module.exports=nodelist;


function nodelist(list) {
  function forEach(fn) {
    for (var i = 0; i < list.length; i += 1) {
      fn(list[i], i);
    }
  }

  function filter(fn) {
    var r = [];
    forEach(function(node, i) {
      if(fn(node, i)) {
        r.push(node);
      }
    });
    return r;
  }

  return {
    forEach: forEach,
    filter: filter
  };
}
