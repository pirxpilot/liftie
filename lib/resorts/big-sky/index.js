module.exports = {
  selector: '.snow-section:first-child li',
  parse: {
    name: 2,
    status: {
      child: '0/0',
      attribute: 'alt'
    }
  }
};
