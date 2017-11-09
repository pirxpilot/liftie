module.exports = {
  selector: 'div.row:nth-child(2) .lift-status tr:nth-child(n + 2)',
  parse: {
    name: 0,
    status: {
      child: '1/0',
      attribute: 'src',
      fn: s => s.split('-')[1]
    }
  }
};
