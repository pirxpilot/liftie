module.exports = {
  selector: '#two td.trail',
  parse: {
    name: 0,
    status: {
      child: 5,
      attribute: 'alt'
    }
  }
};
