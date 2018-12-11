module.exports = {
  selector: '.lifts_info',
  parse: {
    name: 0,
    status: node => node.prev.children[0].attribs.alt
  }
};
