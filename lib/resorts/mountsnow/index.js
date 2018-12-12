module.exports = {
  selector: '.lift-wrapper .report-lift',
  parse: {
    name: {
      child: 1,
      regex: /^#\d+\s+(.+)$/
    },
    status: {
      child: '0/0',
      attribute: 'class',
      regex: /-([a-z]+)$/
    }
  }
};
