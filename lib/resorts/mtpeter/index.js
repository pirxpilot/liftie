module.exports = {
  selector: '#content > div > div:nth-child(4) > div > table > tbody > tr:nth-child(2)', // selector for lift information
  parse: {
    filter: node => node.children, // if present skips nodes for which filter is falsy
    name: '0', // example of a simple path descriptor - index, ',', '..', '+', '-' are supported. Here 0/1 just means "use the second child of the first child."
    status: {
      // example of a compound descriptor child. attribute, regex, fn - can be specified
      child: '+/1',
      attribute: 'alt',
      regex: /-([a-z]+)$/
    }
  }
};
