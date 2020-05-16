module.exports = {
  selector: '.lifts',                // selector for lift information
  filter: node => node.children,     // optional - skip nodes for which filter retuturns nodes
  parse: {
    name: '0/1',            // example of a simple path descriptor - index, ',', '..', '+', '-' are supported
    status: {               // example of a compound descriptor child. attribute, regex, fn - can be specified
      child: '+/1',
      attribute: 'alt',
      regex: /-([a-z]+)$/,
      fn: s => s.slice(0, -3)
    }
  }
};
