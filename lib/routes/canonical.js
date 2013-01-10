module.exports = canonical;

// converts 'Names Like This' into 'names-like-this'
function canonical(str) {
  return str.split(' ').map(function(s) {
    return s.toLowerCase();
  }).join('-');
}