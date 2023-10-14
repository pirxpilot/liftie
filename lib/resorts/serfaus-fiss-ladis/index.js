module.exports = {
  selector: "#lifte div > table > tbody > tr",
  parse: {
    name: '1',
    status: {
      child: '0/0/0',
      attribute: 'class',
      regex: /circle status-([a-z]+)$/
    }
  }
};
