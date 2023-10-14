module.exports = {
  selector: 'tr', // selector for lift information
  // filter: node => node.children,     // optional - skip nodes for which filter retuturns nodes
  parse: {
    name: {
      child: '1/1',
      regex: /^(.+) - $/
    },
    status: {
      child: '0',
      attribute: 'class',
      regex: / ([a-z]+)$/,
    }
  }
};
