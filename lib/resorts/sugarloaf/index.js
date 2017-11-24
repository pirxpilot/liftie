module.exports = {
  selector: '.lift-status .lift',
  parse: {
    name: 0,
    status: node => node.attribs['class'].split(' ').pop()
  }
};
