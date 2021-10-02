module.exports = {
  selector: 'tr[data-toggle="collapse"]',
  parse: {
    name: '1',
    status: {
      child: '0/0',
      attribute: 'src',
      regex: /\/([a-z]+)-icon.svg$/,
      // fn: s => s.slice(0, -3)
    }
  }
};
