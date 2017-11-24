module.exports = {
  selector: '.trail-conditions .lift-label',
  parse: {
    name: '0/0',
    status: node => node.next.children[0].attribs.class.split(' ').pop()
  }
};
