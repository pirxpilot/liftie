module.exports = {
  selector: 'p[data-lift="lift"]',
  parse: {
    name: {
      attribute: 'data-name'
    },
    status: {
      attribute: 'data-status'
    }
  }
};
