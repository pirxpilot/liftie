module.exports = {
  selector: 'table.report2 td.report3',
  parse: {
    name: 0,
    status: node => node.prev.children[0].attribs.src.split('/').pop().slice(5, -4)
  }
};
