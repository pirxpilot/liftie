module.exports = {
  selector: '.lifts-row',
  parse: {
    name: 0,
    status: {
      child: '1/0',
      attribute: 'src',
      regex: /icon-([a-z]+).svg$/
    }
  }
};

