module.exports = {
  selector: '.chair-header',
  parse: {
    name: '1/0',
    status: {
      child: '0/0',
      attribute: 'class',
      fn: v => v.split(' ').pop()
    }
  }
};
