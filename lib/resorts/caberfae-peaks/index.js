module.exports = {
  selector: '#tablepress-4 td:nth-child(even)',
  parse: {
    name: 0,
    status: {
      child: '-/0',
      attribute: 'alt',
      regex: /-([a-z]+)$/
    }
  }
};
