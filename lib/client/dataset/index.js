module.exports=dataset;


function set(node, attr, value) {
  if (node.dataset) {
    node.dataset[attr] = value;
  } else {
    node.setAttribute('data-' + attr, value);
  }
}

function get(node, attr) {
  return node.dataset ? node.dataset[attr] : node.getAttribute('data-' + attr);
}


function dataset(node, attr, value) {
  if (arguments.length === 3) {
    set(node, attr, value);
  } else {
    return get(node, attr);
  }
}