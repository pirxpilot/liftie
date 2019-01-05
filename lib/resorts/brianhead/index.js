module.exports = {
  selector: 'tr',
  parse: {
    name: {
      child: 0,
      regex: /^chair\s+\d+:\s+(.+)$/i
    },
    status: '1/0'
  }
};
