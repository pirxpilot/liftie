module.exports = {
  selector: "div.wrapper > div.row",
  parse: {
    name: '2/0',
      status: node => {
      const statusValue = node.attribs['data-state'];
    return statusValue === '1' ? '1' : 'closed';
  }
}
};
