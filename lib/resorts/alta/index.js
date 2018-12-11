module.exports = {
  selector: '#lift-status + table tr',
  parse: {
    name: 0,
    status: {
      child: '1/0',
      attribute: 'class',
      fn: c => c.split('-').pop()
    }
  }
};
