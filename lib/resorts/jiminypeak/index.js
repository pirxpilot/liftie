module.exports = {
  selector: '#lift-data .list-group-item',
  parse: {
    name: '.',
    status: {
      child: 2,
      attribute: 'class',
      fn: s => s.split('-').pop()
    }
  }
};
