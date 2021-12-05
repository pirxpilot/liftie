module.exports = {
  selector: '[data-lift]',
  parse: {
    name: {
      attribute: 'data-name'
    },
    status: {
      attribute: 'data-status',
      fn: s => s.split(',').pop()
    }
  }
};
