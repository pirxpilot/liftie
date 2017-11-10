module.exports = {
  selector: 'ul.trailinfo:last-child li',
  parse: {
    name: 0,
    status: {
      child: '1/0',
      attribute: 'alt'
    }
  }
};
