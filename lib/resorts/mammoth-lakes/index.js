module.exports = {
  selector: '.lift-description',
  parse: {
    name: 0,
    status: node => node.prev.attribs.class.split(/[-\s]/).pop()
  }
};
