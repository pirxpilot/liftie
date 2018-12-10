module.exports = {
  selector: '.lifts-table tr',
  parse: {
    name: 0,
    status: {
      child: '1/0',
      attribute: 'class',
      regex: /^icon (\S+) fas/
    }
  }
};
