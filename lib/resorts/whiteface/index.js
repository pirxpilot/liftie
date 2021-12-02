module.exports = {
  selector: '.lifts-row',
  parse: {
    name: '1',
    status: {
      child: '2/0',
      attribute: 'src',
      regex: /icon-(.+).svg$/
    }
  }
};
