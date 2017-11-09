module.exports = {
  selector: '.contentTeasers td.name',
  parse: {
    name: 0,
    status: node => node.next.attribs.class.split(' ').pop()
  }
};
