module.exports = {
  selector: '.lifts-table .lift-data',
  parse: {
    name: 0,
    status: {
      child: '1/0',
      attribute: 'class',
      regex: /icon ([a-z]+) fas/
    }
  }
};
