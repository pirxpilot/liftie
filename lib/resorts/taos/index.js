module.exports = {
  selector: '.content article .wrapper',
  // selector: 'tr',
  parse: {
    name: '0/0/0',
    status: {
      child: '1',
      attribute: 'class',
      fn: s => s.split(' ').pop()
    }
  }
};
