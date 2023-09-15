module.exports = {
  selector: "div > table > tbody > tr",
  parse: {
    name: '1',
    status: node => {
      const statusElement = node.children[0].children[0].children[0].attribs['class'];
      return statusElement && statusElement === 'status__circle status-open' ? '1' : 'closed';
    },
  }
};
