module.exports = {
  selector: 'table.t1 tr:nth-child(n + 2)',
  parse: {
    filter: node => node.children.length > 2,
    name: 0,
    status: 1
  }
};
