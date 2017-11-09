module.exports = {
  selector: '.category-section:first-of-type .statusLabel',
  parse: {
    name: 1,
    status: {
      child: 0,
      attribute: 'class',
      fn: s => s.split('_').pop()
    }
  }
};
