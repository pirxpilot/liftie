module.exports = {
  selector: '.module:nth-child(2) tr',
  parse: {
    name: {
      child: 0,
      regex: /^chair\s+\d+:\s+(.+)$/i
    },
    status: 1
  }
};
