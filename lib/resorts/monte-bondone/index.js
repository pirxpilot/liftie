module.exports = {
  selector: 'table[cellspacing="0"] tr:nth-child(n+1)',
  parse: {
    name: '1',
    status: {
      child: '2/0',
      attribute: 'src',
      regex: /\/([a-z]+)\.gif/
    }
  }
};
