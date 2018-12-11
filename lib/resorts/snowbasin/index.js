module.exports = {
  selector: '.lift-status',
  parse: {
    name: '1/0',
    status: {
      child: 0,
      attribute: 'class',
      fn: s => s.split(' ').pop()
    }
  }
};
