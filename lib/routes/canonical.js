module.exports = canonical;

// converts 'Names Like This' into 'names-like-this'
function canonical(str) {
  return str.split(' ').map((s) => s.toLowerCase()).join('-');
}
