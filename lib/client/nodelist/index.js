module.exports=nodelist;


function nodelist(list) {
  function forEach(fn) {
    for (var i = 0; i < list.length; i += 1) {
      fn(list[i], i);
    }
  }

  return {
    forEach: forEach
  };
}
