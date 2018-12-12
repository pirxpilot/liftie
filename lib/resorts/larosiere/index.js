module.exports = {
  selector: '#lift li',
  parse: {
    name: 1,
    status: {
      child: 0,
      attribute: 'class',
      regex: /-([a-z]+)$/
    }
  }
};
