module.exports = decode;

// decodes numeric entities
function decode(str) {
  return str.replace(/&#(x?\d+);/g, function(match, cp) {
    var base = 10;
    if (cp[0] === 'x') {
      base = 16;
      cp = cp.slice(1);
    }
    cp = parseInt(cp, base);
    return String.fromCharCode(cp);
  });
}
