module.exports = {
  selector: '#lift-data .list-group-item',
  parse: {
    name: 0,
    status: {
      child: 1,
      attribute: 'class',
      fn: v => v.split('-').pop()
    }
  }
};
