module.exports = {
  selector: '#liftsOpenStatus .liftIcon',
  parse: {
    name: node => node.next.children[0].data,
    status: function(node) {
      let status = node.attribs.class;
      const match = status.match(/\bstatus(\S+)\b/);
      return match ? match[1] : 'Closed';
    }
  }
};
